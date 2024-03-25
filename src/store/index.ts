// THIRD-PARTY
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import createSagaMiddleware from "redux-saga";

// PROJECT IMPORTS
import rootReducer from "./reducer";
import rootSaga from "store/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

const persister = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
