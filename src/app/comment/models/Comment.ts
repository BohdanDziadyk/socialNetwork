export interface Comment {
  post: number;
  id?: number;
  user?: number;
  username: string;
  body: string;
  image: any;
  created_at?: string;
  updated_at?: string;
}
