import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '@app/auth/services/authentication.service';
import { Order } from '@app/models/orders/order.model';
import { GroupOrderPreview } from '@app/models/group-orders/group-order-preview.model';
import { Participant } from '@app/models/group-orders/participant.model';
import { GuestInvite } from '@app/models/reservations/guest-invite.model';
import { ReservationCustomer } from '@app/models/reservations/reservation.model';
import { PreOrdersService } from '@app/services/pre-orders/pre-orders.service';
import { ReservationService } from '@app/services/reservation/reservation.service';
import { GuestInviteService } from '@app/services/reservation/guest-invite.service';
import { API_BASE_URL } from '@app/shared/config/api-base-url.token';

interface GroupSessionsResponse {
  participants: Participant[];
  total: number;
}

interface GroupReservationStatusResponse {
  currentParticipants: number;
  maxCapacity: number;
  status: 'Open' | 'Submitted' | 'Closed';
}

@Injectable({ providedIn: 'root' })
export class GroupOrdersService {
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthenticationService);
  private readonly reservationService = inject(ReservationService);
  private readonly preOrdersService = inject(PreOrdersService);
  private readonly guestInviteService = inject(GuestInviteService);

  getOwnerGroupOrder$(reservationId: string): Observable<GroupOrderPreview> {
    return forkJoin({
      reservation: this.reservationService.getReservationById(reservationId),
      inviteToken: this.guestInviteService.getInviteToken$(reservationId),
      ownerOrder: this.getOwnerOrder$(reservationId),
    }).pipe(
      switchMap(({ reservation, inviteToken, ownerOrder }) =>
        this.guestInviteService.getInvite$(inviteToken.token).pipe(
          switchMap((invite) =>
            forkJoin({
              guestSessions: this.getGroupSessions$(invite.GroupReservationId),
              status: this.getGroupStatus$(invite.GroupReservationId),
            }).pipe(
              map(({ guestSessions, status }) =>
                this.toGroupOrderPreview(reservation, invite, ownerOrder, guestSessions, status)
              )
            )
          )
        )
      )
    );
  }

  private getOwnerOrder$(reservationId: string): Observable<Order | null> {
    return this.preOrdersService
      .getByReservationId(reservationId)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          error.status === 404 ? of(null) : throwError(() => error)
        )
      );
  }

  private getGroupSessions$(groupReservationId: string): Observable<GroupSessionsResponse> {
    const idToken = this.authService.getTokens()?.idToken;
    if (!idToken) {
      return throwError(() => new Error('Please sign in as the reservation owner.'));
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${idToken}` });
    return this.http.get<GroupSessionsResponse>(
      `${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/sessions`,
      { headers }
    );
  }

  private getGroupStatus$(groupReservationId: string): Observable<GroupReservationStatusResponse> {
    return this.http.get<GroupReservationStatusResponse>(
      `${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/status`
    );
  }

  private toGroupOrderPreview(
    reservation: ReservationCustomer,
    invite: GuestInvite,
    ownerOrder: Order | null,
    guestSessions: GroupSessionsResponse,
    status: GroupReservationStatusResponse
  ): GroupOrderPreview {
    const ownerItems = ownerOrder?.orderItems ?? [];
    const owner: Participant = {
      id: `owner-${reservation.id}`,
      type: 'Owner',
      name: this.authService.getUser()?.firstName || 'You',
      items: ownerItems.map((item) => ({
        dish: {
          id: item.dish.id,
          name: item.dish.name,
          price: item.dish.price,
          imageUrl: item.dish.imageUrl,
        },
        quantity: item.quantity,
      })),
      total: ownerItems.reduce((total, item) => total + item.dish.price * item.quantity, 0),
      isSubmitted: reservation.hasSubmittedPreOrder ?? false,
    };
    const participants = [owner, ...guestSessions.participants];
    const ownerTotal = ownerItems.reduce(
      (total, item) => total + item.dish.price * item.quantity,
      0
    );

    return {
      invite: {
        LocationAddress: invite.LocationAddress,
        StartTime: invite.StartTime,
        EndTime: invite.EndTime,
        MaxGuestCount: status.maxCapacity,
      },
      sessions: {
        participants,
        total: ownerTotal + guestSessions.total,
      },
      status: status.status,
      currentParticipants: status.currentParticipants,
    };
  }
}
