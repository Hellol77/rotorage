export interface ClientData {
  user: UserData;
  accessToken: string;
}

export interface ValidateAccessToken {
  userId: string;
  accessToken: string;
}

export interface UserData extends UserProfile {
  userId: string;
}

export interface UserProfile {
  nickname: string;
  introduce: string;
}

export interface UserEditProfileType extends UserProfile {
  accessToken: string;
}
