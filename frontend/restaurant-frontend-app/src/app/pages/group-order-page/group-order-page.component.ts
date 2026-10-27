import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ParticipantCardComponent } from '@app/components/group-orders/participant-card/participant-card.component';
import { GroupOrderPreview } from '@app/models/group-orders/group-order-preview.model';
import { Participant } from '@app/models/group-orders/participant.model';
import {
  GroupSessionsSnapshot,
  GroupOrderSubmissionResult,
  GroupOrdersService,
} from '@app/services/group-orders/group-orders.service';

@Component({
  selector: 'app-group-order-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, ParticipantCardComponent, RouterLink],
  templateUrl: './group-order-page.component.html',
  styleUrl: './group-order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GroupOrderPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly groupOrdersService = inject(GroupOrdersService);
  private submitDialogElement: HTMLDialogElement | null = null;
  private removeDialogElement: HTMLDialogElement | null = null;

  @ViewChild('submitDialog')
  set submitDialog(ref: ElementRef<HTMLDialogElement> | undefined) {
    this.submitDialogElement = ref?.nativeElement ?? null;
    if (
      this.submitDialogElement &&
      this.isSubmitConfirmationOpen() &&
      !this.submitDialogElement.open
    ) {
      this.submitDialogElement.showModal();
    }
  }

  @ViewChild('removeDialog')
  set removeDialog(ref: ElementRef<HTMLDialogElement> | undefined) {
    this.removeDialogElement = ref?.nativeElement ?? null;
    if (this.removeDialogElement && this.pendingRemoval() && !this.removeDialogElement.open) {
      this.removeDialogElement.showModal();
    }
  }

  readonly groupOrder = signal<GroupOrderPreview | null>(null);
  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly isSubmitConfirmationOpen = signal(false);
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly submitSuccess = signal(false);
  readonly pendingRemoval = signal<Participant | null>(null);
  readonly isRemoving = signal(false);
  readonly removeError = signal<string | null>(null);
  readonly removeSuccess = signal<string | null>(null);
  readonly participants = computed(() => this.groupOrder()?.sessions.participants ?? []);
  readonly submittedGuestCount = computed(
    () =>
      this.participants().filter(
        (participant) =>
          participant.type === 'Guest' && participant.isSubmitted && participant.items.length > 0
      ).length
  );
  readonly submitReadinessMessage = computed(() => {
    const groupOrder = this.groupOrder();
    if (!groupOrder || groupOrder.status !== 'Open') {
      return null;
    }
    if (!groupOrder.hasOwnerOrder) {
      return 'An owner pre-order is required before you can submit the group order.';
    }
    if (this.submittedGuestCount() === 0) {
      return 'At least one guest must submit dishes before you can send the group order.';
    }
    return null;
  });
  readonly canSubmit = computed(
    () =>
      this.groupOrder()?.status === 'Open' && !this.submitReadinessMessage() && !this.isSubmitting()
  );
  readonly guestCountLabel = computed(() => {
    const groupOrder = this.groupOrder();
    return groupOrder
      ? `${groupOrder.currentParticipants} of ${groupOrder.invite.MaxGuestCount} guests`
      : '';
  });
  readonly orderStatusLabel = computed(() => {
    switch (this.groupOrder()?.status) {
      case 'Submitted':
        return 'Sent to Restaurant';
      case 'Closed':
        return 'Closed';
      default:
        return 'Collecting pre-orders';
    }
  });

  ngOnInit(): void {
    this.loadGroupOrder();
  }

  loadGroupOrder(): void {
    const reservationId = this.route.snapshot.paramMap.get('reservationId');
    const groupReservationId =
      this.route.snapshot.queryParamMap.get('groupReservationId') ?? undefined;
    if (!reservationId) {
      this.isLoading.set(false);
      this.loadError.set('Reservation ID is missing from the page URL.');
      return;
    }

    this.isLoading.set(true);
    this.loadError.set(null);

    this.groupOrdersService.getOwnerGroupOrder$(reservationId, groupReservationId).subscribe({
      next: (groupOrder) => {
        this.groupOrder.set(groupOrder);
        if (!groupReservationId) {
          void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { groupReservationId: groupOrder.invite.GroupReservationId },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          });
        }
      },
      error: (error: unknown) => {
        this.loadError.set(this.toLoadErrorMessage(error));
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  openSubmitConfirmation(): void {
    if (!this.canSubmit()) {
      return;
    }
    this.submitError.set(null);
    this.isSubmitConfirmationOpen.set(true);
  }

  cancelSubmitConfirmation(): void {
    if (!this.isSubmitting()) {
      this.closeSubmitConfirmation();
      this.submitError.set(null);
    }
  }

  handleSubmitDialogCancel(event: Event): void {
    event.preventDefault();
    this.cancelSubmitConfirmation();
  }

  openRemoveConfirmation(participant: Participant): void {
    if (participant.type !== 'Guest' || this.isRemoving()) {
      return;
    }
    this.removeError.set(null);
    this.removeSuccess.set(null);
    this.pendingRemoval.set(participant);
  }

  cancelRemoveConfirmation(): void {
    if (this.isRemoving()) {
      return;
    }
    this.closeRemoveConfirmation();
    this.removeError.set(null);
  }

  handleRemoveDialogCancel(event: Event): void {
    event.preventDefault();
    this.cancelRemoveConfirmation();
  }

  confirmGuestRemoval(): void {
    const participant = this.pendingRemoval();
    const groupOrder = this.groupOrder();
    if (!participant || !groupOrder || participant.type !== 'Guest' || this.isRemoving()) {
      return;
    }

    this.isRemoving.set(true);
    this.removeError.set(null);
    this.groupOrdersService
      .deleteGuestSession$(groupOrder.invite.GroupReservationId, participant.id)
      .subscribe({
        next: (snapshot) => {
          this.groupOrder.set(this.withRemovedGuest(groupOrder, snapshot));
          this.removeSuccess.set(`${participant.name} was removed from the group.`);
          this.closeRemoveConfirmation();
        },
        error: (error: unknown) => {
          this.removeError.set(this.toRemoveErrorMessage(error));
          this.isRemoving.set(false);
        },
        complete: () => this.isRemoving.set(false),
      });
  }

  confirmGroupOrderSubmission(): void {
    const groupOrder = this.groupOrder();
    const reservationId = this.route.snapshot.paramMap.get('reservationId');
    if (!groupOrder || !reservationId || !this.canSubmit()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.groupOrdersService
      .submitGroupOrder$(reservationId, groupOrder.invite.GroupReservationId)
      .subscribe({
        next: (result) => {
          this.groupOrder.set(this.withSubmittedOrder(groupOrder, result));
          this.submitSuccess.set(true);
          this.closeSubmitConfirmation();
        },
        error: (error: unknown) => {
          this.submitError.set(this.toSubmitErrorMessage(error));
          this.isSubmitting.set(false);
        },
        complete: () => this.isSubmitting.set(false),
      });
  }

  private closeSubmitConfirmation(): void {
    if (this.submitDialogElement?.open) {
      this.submitDialogElement.close();
    }
    this.isSubmitConfirmationOpen.set(false);
  }

  private closeRemoveConfirmation(): void {
    if (this.removeDialogElement?.open) {
      this.removeDialogElement.close();
    }
    this.pendingRemoval.set(null);
  }

  private withRemovedGuest(
    groupOrder: GroupOrderPreview,
    snapshot: GroupSessionsSnapshot
  ): GroupOrderPreview {
    const owner = groupOrder.sessions.participants.find(
      (participant) => participant.type === 'Owner'
    );
    const ownerTotal = owner?.total ?? 0;
    const participants = [
      ...(owner ? [owner] : []),
      ...snapshot.participants.filter((participant) => participant.type === 'Guest'),
    ];

    return {
      ...groupOrder,
      sessions: {
        participants,
        total: groupOrder.status === 'Submitted' ? ownerTotal : ownerTotal + snapshot.total,
      },
      currentParticipants: Math.max(1, groupOrder.currentParticipants - 1),
    };
  }

  private withSubmittedOrder(
    groupOrder: GroupOrderPreview,
    result: GroupOrderSubmissionResult
  ): GroupOrderPreview {
    const dishById = new Map(
      groupOrder.sessions.participants.flatMap((participant) =>
        participant.items.map((item) => [item.dish.id, item.dish] as const)
      )
    );
    const consolidatedItems = result.finalOrder
      ? result.finalOrder.orderItems.map(({ dish, quantity }) => ({ dish, quantity }))
      : result.submittedDishes.flatMap(({ dishId, quantity }) => {
          const dish = dishById.get(dishId);
          return dish ? [{ dish, quantity }] : [];
        });
    const consolidatedTotal = consolidatedItems.reduce(
      (total, item) => total + item.dish.price * item.quantity,
      0
    );
    const participants = groupOrder.sessions.participants.map((participant) =>
      participant.type === 'Owner'
        ? {
            ...participant,
            items: consolidatedItems,
            total: consolidatedTotal,
            isSubmitted: true,
          }
        : participant
    );

    return {
      ...groupOrder,
      status: 'Submitted',
      sessions: { participants, total: consolidatedTotal },
    };
  }

  private toSubmitErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error as {
        errorCode?: string;
        message?: string;
        error?: string;
      } | null;
      if (error.status === 400) {
        if (apiError?.errorCode === 'GroupReservationSubmitted') {
          return 'This group pre-order has already been submitted.';
        }
        if (apiError?.errorCode === 'GroupReservationExpired') {
          return 'This group reservation has expired and cannot be submitted.';
        }
        return (
          apiError?.message ??
          'No submitted guest dishes are ready to send, or this reservation has no owner pre-order.'
        );
      }
      if (error.status === 401) {
        return 'Your session expired. Sign in again to submit this group pre-order.';
      }
      if (error.status === 403) {
        return 'Only the reservation owner can submit this group pre-order.';
      }
      if (error.status === 404) {
        return apiError?.error ?? 'The reservation or group pre-order could not be found.';
      }
      if (error.status === 409) {
        return 'This group pre-order has already been submitted.';
      }
    }
    return 'Unable to submit this group pre-order. Please try again.';
  }

  private toRemoveErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error as {
        errorCode?: string;
        message?: string;
        error?: string;
      } | null;
      if (error.status === 400) {
        return apiError?.message ?? 'This guest session does not belong to this group.';
      }
      if (error.status === 401) {
        return 'Your session expired. Sign in again to remove this guest.';
      }
      if (error.status === 403) {
        return 'Only the reservation owner can remove a guest from this group.';
      }
      if (error.status === 404) {
        return (
          apiError?.error ??
          'This guest session could not be found. Reload the group and try again.'
        );
      }
    }
    return 'Unable to remove this guest. Please try again.';
  }

  private toLoadErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return 'Please sign in as the reservation owner to view this group pre-order.';
    }
    if (error instanceof HttpErrorResponse && error.status === 403) {
      return 'Only the reservation owner can view this group pre-order.';
    }
    return 'Unable to load this group pre-order. Please try again.';
  }
}
