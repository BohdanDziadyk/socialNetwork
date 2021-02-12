export interface Message {
  id?: number;
  sender?: number;
  receiver?: number;
  sender_name: string;
  body: number;
  image?: any;
  created_at?: string;
  updated_at?: string;
}
