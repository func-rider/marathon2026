import { Participant } from './participant.model';

export interface GroupOrderInvitePreview {
  GroupReservationId: string;
  LocationAddress: string;
  StartTime: string;
  EndTime: string;
  MaxGuestCount: number;
}

export interface GroupOrderSessionsPreview {
  participants: Participant[];
  total: number;
}

export interface GroupOrderPreview {
  invite: GroupOrderInvitePreview;
  sessions: GroupOrderSessionsPreview;
  status: 'Open' | 'Submitted' | 'Closed';
  currentParticipants: number;
  hasOwnerOrder: boolean;
}
