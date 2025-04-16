import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./useUserState";
import { profileReducer } from "./useProfileState";

const useStore = configureStore({
	reducer: {
		user: userReducer,
		profile: profileReducer,
	},
});

type RootState = ReturnType<typeof useStore.getState>;
type AppDispatch = typeof useStore.dispatch;

export { useStore, type RootState, type AppDispatch };
