import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { reducer as pageReducer } from "./pageSlice";
import { reducer as itemReducer } from "./itemsSlice";
import { reducer as rowsReducer } from "./rowsSlice";

const rootReducer = combineReducers({
  page: pageReducer,
  items: itemReducer,
  rows: rowsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createRootStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  });

const _rootStoreForDispatchType = createRootStore();

export type RootDispatch = typeof _rootStoreForDispatchType.dispatch;

export const useRootDispatch: () => RootDispatch = useDispatch;
