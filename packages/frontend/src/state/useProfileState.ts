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

const useProfileState = () => {
	const profileSlice = createSlice({
		name: "profile",
		initialState: null as ProfileEntity | null,
		reducers: {
			addProfile: (state, action: PayloadAction<ProfileEntity>) => {
				state = action.payload;
				return state;
			},
		},
	});

	const { addProfile } = profileSlice.actions;

	return { reducer: profileSlice.reducer, addProfile };
};

export { useProfileState, type ProfileEntity };
