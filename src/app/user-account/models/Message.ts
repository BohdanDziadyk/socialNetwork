export interface Message {
  id?: number;
  sender_id?: number;
  receiver_id?: number;
  sender_name: string;
  body: number;
  image?: any;
  created_at?: string;
  updated_at?: string;
}
