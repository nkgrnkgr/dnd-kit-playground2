import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { assertValue } from "../lib/asserts";
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
  width: string;
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
    changeWidth(
      state,
      action: PayloadAction<{ itemId: string; width: string }>
    ) {
      const { itemId, width } = action.payload;
      itemsAdapter.updateOne(state, {
        id: itemId,
        changes: {
          width,
        },
      });
    },
  },
});

export const itemsSelector = itemsAdapter.getSelectors<RootState>(
  (state) => state.items
);
