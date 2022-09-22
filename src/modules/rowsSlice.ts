import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { v4 as uuid } from "uuid";

type Row = {
  rowId: string;
  itemIds: string[];
};

const rowsAdapter = createEntityAdapter<Row>({
  selectId: (row) => row.rowId,
});

export const { reducer, actions } = createSlice({
  name: "rows",
  initialState: rowsAdapter.getInitialState(),
  reducers: {
    addEmptyRow(state) {
      rowsAdapter.addOne(state, {
        rowId: uuid(),
        itemIds: [],
      });
    },
    addItemId(
      state,
      action: PayloadAction<{ rowId: string; itemId: string }>
    ) {},
  },
});
