import {
  Slice,
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { agroVisionApi } from "../api";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    app: (store = {}) => store,
    [agroVisionApi.reducerPath]: agroVisionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(agroVisionApi.middleware),
});

export const useAppSelector = useSelector;
export const useAppDispatch = (): typeof store.dispatch => useDispatch();

export const createBaseSelector =
  <S, N extends string>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slice: Slice<S, any, N>
  ) =>
  (store: unknown) => {
    const anyStore = store as Record<string, unknown>;
    return anyStore[slice.name] as S;
  };

const sliceSet = new Set<Slice>();

export const registerSlice = (slices: Slice[]) => {
  slices.forEach((x) => sliceSet.add(x));

  const reducer = combineReducers({
    ...Array.from(sliceSet).reduce((acc, slice) => {
      acc[slice.name] = slice.reducer;
      return acc;
    }, {} as Record<string, unknown>),
  });

  store.replaceReducer(reducer);
};
