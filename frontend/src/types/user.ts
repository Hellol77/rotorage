export interface UserData {
  user: {
    userId: string;
    nickname: string;
  };
  accessToken?: string | null;
}

export interface ValidateAccessToken {
  id: string;
  accessToken?: string;
}
