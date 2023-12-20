export interface UserData {
  user: UserType;
  accessToken: string;
}

export interface ValidateAccessToken {
  userId: string;
  accessToken: string;
}

interface UserType {
  userId: string;
  nickname: string;
}
