import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  EMPTY,
  exhaustMap,
  finalize,
  forkJoin,
  interval,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';

import { ParticipantCardComponent } from '@app/components/group-orders/participant-card/participant-card.component';
import { Participant } from '@app/models/group-orders/participant.model';
import { GroupSessionsResponse } from '@app/models/group-orders/group-sessions-response.model';
import { GroupStatusResponse } from '@app/models/group-orders/group-status.model';
import { SubmittedDish } from '@app/models/group-orders/submit-group-pre-order.model';
import { GuestInvite } from '@app/models/reservations/guest-invite.model';
import { consolidatePreOrder } from '@app/shared/helpers/consolidate-pre-order';
import { ModalComponent } from '@app/shared/custom-components/modal/modal.component';
import { GroupOrdersService } from '@app/services/group-orders/group-orders.service';
import { ToastService } from '@app/services/toast/toast.service';

const SYNC_INTERVAL_MS = 15_000;

@Component({
  selector: 'app-group-order-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, ParticipantCardComponent, ModalComponent],
  templateUrl: './group-order-page.component.html',
  styleUrl: './group-order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GroupOrderPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly groupOrdersService = inject(GroupOrdersService);
  private readonly toastService = inject(ToastService);
  private pollingSubscription: Subscription | null = null;

  readonly reservationId = signal<string | null>(null);
  readonly invite = signal<GuestInvite | null>(null);
  readonly groupReservationId = signal<string | null>(null);
  readonly ownerSessionId = signal<string | null>(null);
  readonly sessions = signal<GroupSessionsResponse | null>(null);
  readonly groupStatus = signal<GroupStatusResponse | null>(null);

  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly isRefreshing = signal(false);
  readonly updatedAt = signal<Date | null>(null);
  readonly refreshError = signal<string | null>(null);

  readonly isSubmitDialogOpen = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly submitSuccess = signal(false);

  readonly pendingRemoval = signal<Participant | null>(null);
  readonly isRemoving = signal(false);
  readonly removeError = signal<string | null>(null);
  readonly removeSuccess = signal<string | null>(null);

  readonly participants = computed(() => this.sessions()?.participants ?? []);
  readonly consolidatedOrder = computed(() => consolidatePreOrder(this.participants()));
  readonly pendingGuestCount = computed(
    () =>
      this.participants().filter(
        (participant) => participant.type === 'Guest' && !participant.isSubmitted
      ).length
  );
  readonly pendingGuestMessage = computed(() => {
    const count = this.pendingGuestCount();
    if (count === 0) {
      return null;
    }
    const noun = count === 1 ? 'participant' : 'participants';
    const verb = count === 1 ? "hasn't" : "haven't";
    return `${count} ${noun} ${verb} submitted their cart yet — their dishes won't be included in the order`;
  });
  readonly guestCountLabel = computed(() => {
    const currentCount = this.groupStatus()?.currentParticipants;
    const maximumCount = this.invite()?.MaxGuestCount;
    return currentCount === undefined || maximumCount === undefined
      ? ''
      : `${currentCount} of ${maximumCount} guests`;
  });
  readonly orderStatusLabel = computed(() => {
    switch (this.groupStatus()?.status) {
      case 'Submitted':
        return 'Sent to Restaurant';
      case 'Closed':
        return 'Closed';
      default:
        return 'Collecting pre-orders';
    }
  });
  readonly canSubmit = computed(
    () =>
      this.groupStatus()?.status === 'Open' &&
      this.consolidatedOrder().items.length > 0 &&
      !this.isSubmitting()
  );
  readonly canRemoveGuests = computed(() => this.groupStatus()?.status === 'Open');

  ngOnInit(): void {
    this.loadGroupOrder();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  loadGroupOrder(): void {
    const reservationId = this.route.snapshot.paramMap.get('reservationId');
    this.stopPolling();
    this.isRefreshing.set(false);

    if (!reservationId) {
      this.isLoading.set(false);
      this.loadError.set('Reservation ID is missing from the page URL.');
      return;
    }

    this.reservationId.set(reservationId);
    this.isLoading.set(true);
    this.loadError.set(null);

    this.groupOrdersService
      .getGroupInvite$(reservationId)
      .pipe(
        tap((invite) => {
          this.invite.set(invite);
          this.groupReservationId.set(invite.GroupReservationId);
        }),
        exhaustMap((invite) =>
          forkJoin({
            ownerSessionId: this.groupOrdersService.getOwnerSessionId$(reservationId),
            sessions: this.groupOrdersService.getSessions$(invite.GroupReservationId),
            status: this.groupOrdersService.getStatus$(invite.GroupReservationId),
          })
        )
      )
      .subscribe({
        next: ({ ownerSessionId, sessions, status }) => {
          this.ownerSessionId.set(ownerSessionId);
          this.sessions.set(sessions);
          this.groupStatus.set(status);
          this.updatedAt.set(new Date());
          this.refreshError.set(null);
          this.isLoading.set(false);
          if (status.status === 'Open') {
            this.startPolling();
          }
        },
        error: (error: unknown) => {
          this.loadError.set(this.toLoadErrorMessage(error));
          this.isLoading.set(false);
        },
      });
  }

  refreshNow(): void {
    this.refreshSnapshot$().subscribe();
  }

  openSubmitDialog(): void {
    if (!this.canSubmit()) {
      return;
    }
    this.submitError.set(null);
    this.isSubmitDialogOpen.set(true);
  }

  closeSubmitDialog(): void {
    if (!this.isSubmitting()) {
      this.isSubmitDialogOpen.set(false);
      this.submitError.set(null);
    }
  }

  confirmGroupOrderSubmission(): void {
    const groupReservationId = this.groupReservationId();
    const reservationId = this.reservationId();
    if (!groupReservationId || !reservationId || !this.canSubmit()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.groupOrdersService.submit$(groupReservationId, reservationId).subscribe({
      next: (submittedDishes) => {
        this.applySubmittedDishes(submittedDishes);
        this.groupStatus.update((status) => (status ? { ...status, status: 'Submitted' } : status));
        this.submitSuccess.set(true);
        this.isSubmitDialogOpen.set(false);
        this.stopPolling();
        this.toastService.success('Pre-order sent to the restaurant');
      },
      error: (error: unknown) => {
        this.submitError.set(this.toActionErrorMessage(error, 'Unable to submit this pre-order.'));
        this.isSubmitting.set(false);
      },
      complete: () => this.isSubmitting.set(false),
    });
  }

  openRemoveConfirmation(participant: Participant): void {
    if (participant.type !== 'Guest' || !this.canRemoveGuests() || this.isRemoving()) {
      return;
    }
    this.removeError.set(null);
    this.removeSuccess.set(null);
    this.pendingRemoval.set(participant);
  }

  closeRemoveConfirmation(): void {
    if (!this.isRemoving()) {
      this.pendingRemoval.set(null);
      this.removeError.set(null);
    }
  }

  confirmGuestRemoval(): void {
    const participant = this.pendingRemoval();
    const groupReservationId = this.groupReservationId();
    if (
      !participant ||
      participant.type !== 'Guest' ||
      !groupReservationId ||
      !this.canRemoveGuests() ||
      this.isRemoving()
    ) {
      return;
    }

    this.isRemoving.set(true);
    this.removeError.set(null);
    this.groupOrdersService.removeSession$(groupReservationId, participant.id).subscribe({
      next: (sessions) => {
        this.sessions.set(sessions);
        this.groupStatus.update((status) =>
          status
            ? { ...status, currentParticipants: Math.max(0, status.currentParticipants - 1) }
            : status
        );
        this.updatedAt.set(new Date());
        this.pendingRemoval.set(null);
        this.removeSuccess.set(`${participant.name} was removed from the group.`);
        this.toastService.success(`${participant.name} was removed from the group`);
      },
      error: (error: unknown) => {
        this.removeError.set(this.toActionErrorMessage(error, 'Unable to remove this guest.'));
        this.isRemoving.set(false);
      },
      complete: () => this.isRemoving.set(false),
    });
  }

  private startPolling(): void {
    this.stopPolling();
    this.pollingSubscription = interval(SYNC_INTERVAL_MS)
      .pipe(exhaustMap(() => this.refreshSnapshot$()))
      .subscribe();
  }

  private stopPolling(): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = null;
  }

  private refreshSnapshot$(): Observable<void> {
    const groupReservationId = this.groupReservationId();
    if (
      !groupReservationId ||
      this.groupStatus()?.status !== 'Open' ||
      this.isRefreshing() ||
      this.isLoading()
    ) {
      return EMPTY;
    }

    this.isRefreshing.set(true);
    return forkJoin({
      sessions: this.groupOrdersService.getSessions$(groupReservationId, { silent: true }),
      status: this.groupOrdersService.getStatus$(groupReservationId, { silent: true }),
    }).pipe(
      tap(({ sessions, status }) => {
        this.sessions.set(sessions);
        this.groupStatus.set(status);
        this.updatedAt.set(new Date());
        this.refreshError.set(null);
        if (status.status !== 'Open') {
          this.stopPolling();
        }
      }),
      map(() => undefined),
      catchError(() => {
        this.refreshError.set("Couldn't refresh. Showing data from the last update.");
        return EMPTY;
      }),
      finalize(() => this.isRefreshing.set(false))
    );
  }

  private applySubmittedDishes(submittedDishes: SubmittedDish[]): void {
    const currentSessions = this.sessions();
    if (!currentSessions) {
      return;
    }

    const dishById = new Map(
      currentSessions.participants.flatMap((participant) =>
        participant.items.map((item) => [item.dish.id, item.dish] as const)
      )
    );
    const items = submittedDishes.flatMap(({ dishId, quantity }) => {
      const dish = dishById.get(dishId);
      return dish ? [{ dish, quantity }] : [];
    });
    const total = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
    const participants = currentSessions.participants.map((participant) =>
      participant.type === 'Owner'
        ? { ...participant, items, total, isSubmitted: true }
        : participant
    );
    this.sessions.set({ participants, total });
    this.updatedAt.set(new Date());
    this.refreshError.set(null);
  }

  private toLoadErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      return 'Group reservation not found';
    }
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return 'Please sign in as the reservation owner to view this group pre-order.';
    }
    if (error instanceof HttpErrorResponse && error.status === 403) {
      return 'Only the reservation owner can view this group pre-order.';
    }
    return 'Unable to load this group pre-order. Please try again.';
  }

  private toActionErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const response = error.error as { message?: string; error?: string } | string | null;
      if (typeof response === 'string') {
        return response;
      }
      return response?.message ?? response?.error ?? fallback;
    }
    return fallback;
  }
}
