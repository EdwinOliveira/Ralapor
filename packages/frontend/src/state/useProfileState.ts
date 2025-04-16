import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProfileEntity = {
	id: number;
	userId: number;
	firstName: string;
	lastName: string;
	dateBirth: string;
	createdAt: string;
	updatedAt: string;
};

const initialState = {} as ProfileEntity;

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		addProfile: (_state, action: PayloadAction<ProfileEntity>) => {
			return action.payload;
		},
	},
});

export const { addProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export type { ProfileEntity };
