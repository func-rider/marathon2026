import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantCardComponent } from './participant-card.component';
import { Participant } from '@app/models/group-orders/participant.model';

describe('ParticipantCardComponent', () => {
  let fixture: ComponentFixture<ParticipantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantCardComponent],
    }).compileComponents();
  });

  function renderParticipant(participant: Participant): HTMLElement {
    fixture = TestBed.createComponent(ParticipantCardComponent);
    fixture.componentRef.setInput('participant', participant);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('labels the owner and guest by their role and name', () => {
    const ownerElement = renderParticipant({
      id: 'owner-session',
      type: 'Owner',
      name: 'Yevhenii',
      items: [],
      total: 0,
      isSubmitted: false,
    });

    expect(ownerElement.querySelector('h2')?.textContent).toContain('Owner: Yevhenii');

    const guestElement = renderParticipant({
      id: 'guest-session',
      type: 'Guest',
      name: 'Kateryna',
      items: [],
      total: 0,
      isSubmitted: false,
    });

    expect(guestElement.querySelector('h2')?.textContent).toContain('Guest: Kateryna');
  });

  it('shows dish quantities, line prices, subtotal, and submitted status', () => {
    const participantElement = renderParticipant({
      id: 'guest-session',
      type: 'Guest',
      name: 'Kateryna',
      items: [
        {
          dish: {
            id: 'caesar-salad',
            name: 'Caesar Salad',
            price: 18,
            imageUrl: null,
          },
          quantity: 2,
        },
      ],
      total: 36,
      isSubmitted: true,
    });

    const text = participantElement.textContent ?? '';

    expect(text).toContain('Caesar Salad');
    expect(text).toContain('× 2');
    expect(text).toContain('$36');
    expect(text).toContain('Subtotal');
    expect(text).toContain('Submitted');
  });

  it('shows a text status and empty message when a cart has no dishes', () => {
    const participantElement = renderParticipant({
      id: 'guest-session',
      type: 'Guest',
      name: 'Alex',
      items: [],
      total: 0,
      isSubmitted: false,
    });

    const text = participantElement.textContent ?? '';

    expect(text).toContain('No dishes yet');
    expect(text).toContain('Still choosing');
    expect(text).toContain('Subtotal');
  });
});
