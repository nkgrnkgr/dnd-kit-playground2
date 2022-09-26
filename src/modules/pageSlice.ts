import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  activeElementProperty: {
    id: string | undefined;
    width: string | undefined;
    height: string | undefined;
  };
};

const initialState: State = {
  activeElementProperty: {
    id: undefined,
    width: undefined,
    height: undefined,
  },
};

export const { actions, reducer } = createSlice({
  name: "page",
  initialState,
  reducers: {
    setActiveElementProperty(
      state,
      action: PayloadAction<{ id: string; height: string; width: string }>
    ) {
      const { id, width, height } = action.payload;
      state.activeElementProperty = { id, width, height };
    },
  },
});
