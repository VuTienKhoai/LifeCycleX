import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/slices/app.slice";
import userReducer from "../features/slices/user.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
