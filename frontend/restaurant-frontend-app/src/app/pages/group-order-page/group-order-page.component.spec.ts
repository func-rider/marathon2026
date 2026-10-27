import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { GroupOrderPreview } from '@app/models/group-orders/group-order-preview.model';
import { GroupOrdersService } from '@app/services/group-orders/group-orders.service';
import { GroupOrderPageComponent } from './group-order-page.component';

describe('GroupOrderPageComponent', () => {
  let fixture: ComponentFixture<GroupOrderPageComponent>;
  let pageElement: HTMLElement;
  let groupOrdersService: jasmine.SpyObj<GroupOrdersService>;

  const apiGroupOrder: GroupOrderPreview = {
    invite: {
      GroupReservationId: 'group-reservation-1',
      LocationAddress: '48 Rustaveli Avenue',
      StartTime: '2026-10-17T12:00:00',
      EndTime: '2026-10-17T14:00:00',
      MaxGuestCount: 5,
    },
    sessions: {
      participants: [
        {
          id: 'owner-session',
          type: 'Owner',
          name: 'Yevhenii',
          items: [],
          total: 0,
          isSubmitted: false,
        },
        ...['Alex', 'Julia', 'Kateryna'].map((name, index) => ({
          id: `guest-${index}`,
          type: 'Guest' as const,
          name,
          items: [],
          total: 0,
          isSubmitted: true,
        })),
      ],
      total: 198,
    },
    status: 'Open',
    currentParticipants: 4,
    hasOwnerOrder: true,
  };

  beforeEach(async () => {
    groupOrdersService = jasmine.createSpyObj<GroupOrdersService>('GroupOrdersService', [
      'getOwnerGroupOrder$',
    ]);
    groupOrdersService.getOwnerGroupOrder$.and.returnValue(of(apiGroupOrder));

    await TestBed.configureTestingModule({
      imports: [GroupOrderPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ reservationId: 'reservation-1' }),
              queryParamMap: convertToParamMap({
                groupReservationId: 'group-reservation-1',
              }),
            },
          },
        },
        { provide: GroupOrdersService, useValue: groupOrdersService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupOrderPageComponent);
    fixture.detectChanges();
    pageElement = fixture.nativeElement as HTMLElement;
  });

  it('loads the reservation and group order from the API service', () => {
    expect(groupOrdersService.getOwnerGroupOrder$).toHaveBeenCalledOnceWith(
      'reservation-1',
      'group-reservation-1'
    );
  });

  it('shows the group reservation details and current participant capacity', () => {
    const text = pageElement.textContent ?? '';

    expect(text).toContain('Group Pre-Order');
    expect(text).toContain('Collecting pre-orders');
    expect(text).toContain('48 Rustaveli Avenue');
    expect(text).toContain('Oct 17, 2026');
    expect(text).toContain('12:00 - 14:00');
    expect(text).toContain('4 of 5 guests');
  });

  it('renders every API participant and the API grand total', () => {
    const text = pageElement.textContent ?? '';

    expect(pageElement.querySelectorAll('app-participant-card').length).toBe(4);
    expect(text).toContain('Grand Total');
    expect(text).toContain('$198');
  });

  it('uses one main heading and semantic participant list items', () => {
    expect(pageElement.querySelectorAll('main').length).toBe(1);
    expect(pageElement.querySelectorAll('h1').length).toBe(1);
    expect(pageElement.querySelector('ul.participants')).not.toBeNull();
    expect(pageElement.querySelectorAll('ul.participants > li').length).toBe(4);
    expect(pageElement.querySelectorAll('article').length).toBe(4);
  });
});
