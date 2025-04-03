import { configureStore } from "@reduxjs/toolkit";
import { UserState } from "./UserState";
import { ProfileState } from "./ProfileState";

const store = configureStore({
	reducer: {
		users: UserState().reducer,
		profiles: ProfileState().reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, type RootState, type AppDispatch };
