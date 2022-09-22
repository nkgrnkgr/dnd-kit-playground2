import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

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
    addItem(state, action: PayloadAction<Omit<Item, "itemId">>) {
      const value = action.payload;
      itemsAdapter.addOne(state, {
        itemId: uuid(),
        ...value,
      });
    },
  },
});
