import { arrayMove } from "@dnd-kit/sortable";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { assertValue } from "../lib/asserts";

import { RootState } from "./store";

type Row = {
  rowId: string;
  itemIds: string[];
};

const rowsAdapter = createEntityAdapter<Row>({
  selectId: (row) => row.rowId,
});

const filledState = rowsAdapter.addMany(rowsAdapter.getInitialState(), [
  { rowId: "row-1", itemIds: [] },
  { rowId: "row-2", itemIds: [] },
]);

export const { reducer, actions } = createSlice({
  name: "rows",
  initialState: filledState,
  reducers: {
    addItemId(state, action: PayloadAction<{ rowId: string; itemId: string }>) {
      const { rowId, itemId } = action.payload;
      const row = state.entities[rowId];
      assertValue(row);
      row.itemIds.push(itemId);
    },
    sortItem(
      state,
      action: PayloadAction<{
        rowId: string;
        activeItemId: string;
        overItemId: string;
      }>
    ) {
      const { rowId, activeItemId, overItemId } = action.payload;
      const row = state.entities[rowId];
      assertValue(row);
      const { itemIds } = row;
      const activeIdIndex = itemIds.findIndex((id) => id === activeItemId);
      const overIdIndex = itemIds.findIndex((id) => id === overItemId);
      row.itemIds = arrayMove(itemIds, activeIdIndex, overIdIndex);
    },
    removeItemId(
      state,
      action: PayloadAction<{ rowId: string; itemId: string }>
    ) {
      const { rowId, itemId } = action.payload;
      const row = state.entities[rowId];
      assertValue(row);
      row.itemIds = row.itemIds.filter((id) => id !== itemId);
    },
  },
});

export const rowsSelector = rowsAdapter.getSelectors<RootState>(
  (state) => state.rows
);
