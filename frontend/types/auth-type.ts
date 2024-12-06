export type TAuth = {
  username: string;
  password: string;
};

export type TUser = {
  id: string;
  username: string;
};

export type TPSignIn = {
  user: TUser;
  token: string;
  refreshToken: string;
};
