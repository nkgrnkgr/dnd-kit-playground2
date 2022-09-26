import { arrayMove } from "@dnd-kit/sortable";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { assertValue } from "../lib/asserts";
import { insertToArray } from "../lib/insertToArray";

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
  { rowId: "row-3", itemIds: [] },
  { rowId: "row-4", itemIds: [] },
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
    moveItemId(
      state,
      action: PayloadAction<{
        activeRowId: string;
        activeItemId: string;
        overRowId: string;
        overItemId: string;
      }>
    ) {
      const { activeItemId, activeRowId, overRowId, overItemId } =
        action.payload;
      const activeRow = state.entities[activeRowId];
      assertValue(activeRow);

      // remove
      activeRow.itemIds = activeRow.itemIds.filter((id) => id !== activeItemId);

      // insert
      const overRow = state.entities[overRowId];
      assertValue(overRow);
      const overItemIndex = overRow.itemIds.findIndex(
        (id) => id === overItemId
      );
      const newArray = insertToArray(
        overRow.itemIds,
        activeItemId,
        overItemIndex
      );
      overRow.itemIds = newArray;
    },
  },
});

export const rowsSelector = rowsAdapter.getSelectors<RootState>(
  (state) => state.rows
);
