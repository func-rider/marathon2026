import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ParticipantCardComponent } from '@app/components/group-orders/participant-card/participant-card.component';
import { GroupOrderPreview } from '@app/models/group-orders/group-order-preview.model';
import { GroupOrdersService } from '@app/services/group-orders/group-orders.service';

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
  private readonly groupOrdersService = inject(GroupOrdersService);

  readonly groupOrder = signal<GroupOrderPreview | null>(null);
  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly participants = computed(() => this.groupOrder()?.sessions.participants ?? []);
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
    if (!reservationId) {
      this.isLoading.set(false);
      this.loadError.set('Reservation ID is missing from the page URL.');
      return;
    }

    this.isLoading.set(true);
    this.loadError.set(null);

    this.groupOrdersService.getOwnerGroupOrder$(reservationId).subscribe({
      next: (groupOrder) => this.groupOrder.set(groupOrder),
      error: (error: unknown) => {
        this.loadError.set(this.toLoadErrorMessage(error));
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
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
