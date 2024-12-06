import { TPSignIn, TUser } from "@/types/auth-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  user: TUser | {};
  token: string | null;
  refreshToken: string | null;
};

const initialState: TInitialState = {
  user: {},
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<TPSignIn>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    signOut: (state) => {
      state.user = {};
      state.token = null;
      state.refreshToken = null;
    },
    updateUser: (state, action: PayloadAction<TUser>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export default authSlice.reducer;
export const AuthAction = authSlice.actions;
