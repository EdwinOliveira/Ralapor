import { configureStore } from "@reduxjs/toolkit";
import { UserState } from "./UserState";

const store = configureStore({
	reducer: {
		users: UserState().reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, type RootState, type AppDispatch };
