export interface ClientData {
  user: UserData;
  accessToken: string;
}

export interface ValidateAccessToken {
  _id: string;
  accessToken: string;
}

export interface UserData extends UserProfile {
  _id: string;
  type: string;
}

export interface UserEditProfileType extends UserProfile {
  accessToken: string;
}

export interface UserProfile {
  nickname: string;
  introduce: string;
  profileImage: File | string;
}

export type PostUserType = Omit<UserData, "accessToken" | "introduce">;
