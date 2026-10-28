import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { GroupSessionsResponse } from '@app/models/group-orders/group-sessions-response.model';
import { GuestInvite } from '@app/models/reservations/guest-invite.model';
import { GroupOrdersService } from '@app/services/group-orders/group-orders.service';
import { ToastService } from '@app/services/toast/toast.service';
import { GroupOrderPageComponent } from './group-order-page.component';

describe('GroupOrderPageComponent owner session ID', () => {
  it('loads the owner ID from its endpoint when the sessions response contains guests only', () => {
    const service = jasmine.createSpyObj<GroupOrdersService>('GroupOrdersService', [
      'getGroupInvite$',
      'getSessions$',
      'getOwnerSessionId$',
      'getStatus$',
      'submit$',
    ]);
    const invite = {
      GroupReservationId: 'group-1',
      LocationAddress: 'Main Street 1',
      MaxGuestCount: 5,
      StartTime: '2026-10-21T16:00:00Z',
      EndTime: '2026-10-21T17:30:00Z',
    } as GuestInvite;
    const sessions: GroupSessionsResponse = {
      participants: [
        {
          id: 'guest-session-1',
          type: 'Guest',
          name: 'Guest',
          isSubmitted: true,
          total: 180,
          items: [],
        },
      ],
      total: 180,
    };

    service.getGroupInvite$.and.returnValue(of(invite));
    service.getSessions$.and.returnValue(of(sessions));
    service.getOwnerSessionId$.and.returnValue(of('owner-session-1'));
    service.getStatus$.and.returnValue(
      of({ currentParticipants: 2, maxCapacity: 5, status: 'Open' as const })
    );

    TestBed.configureTestingModule({
      imports: [GroupOrderPageComponent],
      providers: [
        { provide: GroupOrdersService, useValue: service },
        {
          provide: ToastService,
          useValue: jasmine.createSpyObj('ToastService', ['success', 'error', 'info']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ reservationId: 'reservation-1' }) },
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(GroupOrderPageComponent);
    fixture.detectChanges();

    expect(service.getOwnerSessionId$).toHaveBeenCalledOnceWith('reservation-1');
    expect(fixture.componentInstance.ownerSessionId()).toBe('owner-session-1');
  });
});
