import { configureStore } from "@reduxjs/toolkit";
import { useUserState } from "./useUserState";
import { useProfileState } from "./useProfileState";

const store = configureStore({
	reducer: {
		users: useUserState().reducer,
		profiles: useProfileState().reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, type RootState, type AppDispatch };
