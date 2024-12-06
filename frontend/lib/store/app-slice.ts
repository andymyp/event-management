import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  isLoading: boolean;
};

const initialState: TinitialState = {
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default appSlice.reducer;
export const AppAction = appSlice.actions;
