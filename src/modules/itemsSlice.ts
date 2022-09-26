import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export const ITEM_TYPE = {
  SMALL: "SMALL",
  MIDDLE: "MIDDLE",
  LARGE: "LARGE",
} as const;

export type ItemType = TypeOfValues<typeof ITEM_TYPE>;

export type Item = {
  itemId: string;
  type: ItemType;
  isPlaceHolder: boolean;
};

const itemsAdapter = createEntityAdapter<Item>({
  selectId: (item) => item.itemId,
});

export const { reducer, actions } = createSlice({
  name: "items",
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      itemsAdapter.addOne(state, action.payload);
    },
  },
});

export const itemsSelector = itemsAdapter.getSelectors<RootState>(
  (state) => state.items
);
