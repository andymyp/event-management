import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { THeader } from "@/types/app-type";

type TinitialState = {
  isLoading: boolean;
  header: THeader;
};

const initialState: TinitialState = {
  isLoading: false,
  header: {
    title: undefined,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHeader: (state, action: PayloadAction<THeader>) => {
      state.header = action.payload;
    },
    resetState: (state) => {
      state.header = initialState.header;
    },
  },
});

export default appSlice.reducer;
export const AppAction = appSlice.actions;
