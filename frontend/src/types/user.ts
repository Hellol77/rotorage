export interface ClientData {
  user: UserData;
  accessToken: string;
}

export interface ValidateAccessToken {
  userId: string;
  accessToken: string;
}

export interface UserData {
  userId: string;
  nickname: string;
  introduce: string | null;
}
