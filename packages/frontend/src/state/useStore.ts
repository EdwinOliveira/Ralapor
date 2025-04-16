import { configureStore } from "@reduxjs/toolkit";
import { useUserState } from "./useUserState";
import { useProfileState } from "./useProfileState";

const useStore = configureStore({
	reducer: {
		user: useUserState().reducer,
		profile: useProfileState().reducer,
	},
});

type RootState = ReturnType<typeof useStore.getState>;
type AppDispatch = typeof useStore.dispatch;

export { useStore, type RootState, type AppDispatch };
