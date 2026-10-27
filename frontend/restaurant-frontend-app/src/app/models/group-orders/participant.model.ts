export type ParticipantType = 'Owner' | 'Guest';

export interface ParticipantDish {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
}

export interface ParticipantItem {
  dish: ParticipantDish;
  quantity: number;
  note?: string;
}

export interface Participant {
  id: string;
  type: ParticipantType;
  name: string;
  items: ParticipantItem[];
  total: number;
  isSubmitted: boolean;
}
