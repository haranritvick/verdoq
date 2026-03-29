export interface IResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
}
