import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { v4 as uuid } from "uuid";
import { RootState } from "./store";

type Row = {
  rowId: string;
  itemIds: string[];
};

const rowsAdapter = createEntityAdapter<Row>({
  selectId: (row) => row.rowId,
});

export const { reducer, actions } = createSlice({
  name: "rows",
  initialState: rowsAdapter.getInitialState({
    ids: ["row-1", "row-2"],
    entities: [
      { rowId: "row-1", itemIds: [] },
      { rowId: "row-2", itemIds: [] },
    ],
  }),
  reducers: {
    addItemId(
      state,
      action: PayloadAction<{ rowId: string; itemId: string }>
    ) {},
  },
});

export const rowsSelector = rowsAdapter.getSelectors<RootState>(
  (state) => state.rows
);
