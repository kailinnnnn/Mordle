import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
