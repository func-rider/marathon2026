import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '@app/auth/services/authentication.service';
import { Order } from '@app/models/orders/order.model';
import { GroupOrderPreview } from '@app/models/group-orders/group-order-preview.model';
import { Participant } from '@app/models/group-orders/participant.model';
import { GuestInvite } from '@app/models/reservations/guest-invite.model';
import { ReservationCustomer } from '@app/models/reservations/reservation.model';
import { SKIP_ERROR_TOAST } from '@app/auth/skip-error-toast.context';
import { PreOrdersService } from '@app/services/pre-orders/pre-orders.service';
import { ReservationService } from '@app/services/reservation/reservation.service';
import { GuestInviteService } from '@app/services/reservation/guest-invite.service';
import { API_BASE_URL } from '@app/shared/config/api-base-url.token';

interface GroupSessionsResponse {
  participants: Participant[];
  total: number;
}

type GroupOrderInviteData = Pick<
  GuestInvite,
  'GroupReservationId' | 'LocationAddress' | 'StartTime' | 'EndTime'
>;

interface OwnerGuestSessionResponse {
  guestSessionId: string;
}

interface GroupReservationStatusResponse {
  currentParticipants: number;
  maxCapacity: number;
  status: 'Open' | 'Submitted' | 'Closed';
}

export interface GroupOrderSubmittedDish {
  dishId: string;
  quantity: number;
}

export interface GroupOrderSubmissionResult {
  submittedDishes: GroupOrderSubmittedDish[];
  finalOrder: Order | null;
}

@Injectable({ providedIn: 'root' })
export class GroupOrdersService {
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthenticationService);
  private readonly reservationService = inject(ReservationService);
  private readonly preOrdersService = inject(PreOrdersService);
  private readonly guestInviteService = inject(GuestInviteService);

  getOwnerGroupOrder$(
    reservationId: string,
    groupReservationId?: string
  ): Observable<GroupOrderPreview> {
    return forkJoin({
      reservation: this.reservationService.getReservationById(reservationId),
      ownerSession: this.getOwnerGuestSessionId$(reservationId),
      ownerOrder: this.getOwnerOrder$(reservationId),
    }).pipe(
      switchMap(({ reservation, ownerSession, ownerOrder }) => {
        const ownerSessionId = ownerSession.guestSessionId;
        if (groupReservationId) {
          return this.getGroupOrderDetails$(
            reservation,
            ownerSessionId,
            ownerOrder,
            groupReservationId,
            {
              GroupReservationId: groupReservationId,
              LocationAddress: reservation.locationAddress,
              StartTime: String(reservation.startTime),
              EndTime: String(reservation.endTime),
            }
          );
        }

        return this.guestInviteService.getInviteToken$(reservationId).pipe(
          switchMap(({ token }) => this.guestInviteService.getInvite$(token)),
          switchMap((invite) =>
            this.getGroupOrderDetails$(
              reservation,
              ownerSessionId,
              ownerOrder,
              invite.GroupReservationId,
              invite
            )
          )
        );
      })
    );
  }

  submitGroupOrder$(
    reservationId: string,
    groupReservationId: string
  ): Observable<GroupOrderSubmissionResult> {
    const url = `${this.baseUrl}/group-reservations/${encodeURIComponent(groupReservationId)}/submit`;
    const context = new HttpContext().set(SKIP_ERROR_TOAST, true);

    return this.http.post<GroupOrderSubmittedDish[]>(url, { reservationId }, { context }).pipe(
      switchMap((submittedDishes) =>
        this.preOrdersService.getByReservationId(reservationId, true).pipe(
          map((finalOrder) => ({ submittedDishes, finalOrder })),
          catchError(() => of({ submittedDishes, finalOrder: null }))
        )
      )
    );
  }

  private getOwnerGuestSessionId$(reservationId: string): Observable<OwnerGuestSessionResponse> {
    const url = `${this.baseUrl}/reservations/${encodeURIComponent(reservationId)}/guest-session-id`;
    return this.http.get<OwnerGuestSessionResponse>(url, {
      context: new HttpContext().set(SKIP_ERROR_TOAST, true),
    });
  }

  private getOwnerOrder$(reservationId: string): Observable<Order | null> {
    return this.preOrdersService
      .getByReservationId(reservationId, true)
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

  private getGroupOrderDetails$(
    reservation: ReservationCustomer,
    ownerSessionId: string,
    ownerOrder: Order | null,
    groupReservationId: string,
    invite: GroupOrderInviteData
  ): Observable<GroupOrderPreview> {
    return forkJoin({
      guestSessions: this.getGroupSessions$(groupReservationId),
      status: this.getGroupStatus$(groupReservationId),
    }).pipe(
      map(({ guestSessions, status }) =>
        this.toGroupOrderPreview(
          reservation,
          invite,
          ownerSessionId,
          ownerOrder,
          guestSessions,
          status
        )
      )
    );
  }

  private toGroupOrderPreview(
    reservation: ReservationCustomer,
    invite: GroupOrderInviteData,
    ownerSessionId: string,
    ownerOrder: Order | null,
    guestSessions: GroupSessionsResponse,
    status: GroupReservationStatusResponse
  ): GroupOrderPreview {
    const ownerItems = ownerOrder?.orderItems ?? [];
    const owner: Participant = {
      id: ownerSessionId,
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
        GroupReservationId: invite.GroupReservationId,
        LocationAddress: invite.LocationAddress,
        StartTime: invite.StartTime,
        EndTime: invite.EndTime,
        MaxGuestCount: status.maxCapacity,
      },
      sessions: {
        participants,
        total: status.status === 'Submitted' ? ownerTotal : ownerTotal + guestSessions.total,
      },
      status: status.status,
      currentParticipants: status.currentParticipants,
      hasOwnerOrder: ownerOrder !== null,
    };
  }
}
