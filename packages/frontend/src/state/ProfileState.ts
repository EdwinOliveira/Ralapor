import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProfileEntity = {
	id: number;
	userId: number;
	firstName: string;
	lastName: string;
	dateBirth: Date;
	createdAt: string;
	updatedAt: string;
};

const ProfileState = () => {
	const profileSlice = createSlice({
		name: "profiles",
		initialState: new Array<ProfileEntity>(),
		reducers: {
			addProfile: (state, action: PayloadAction<ProfileEntity>) => {
				state.push(action.payload);
				return state;
			},
		},
	});

	const { addProfile } = profileSlice.actions;

	return { reducer: profileSlice.reducer, addProfile };
};

export { ProfileState, type ProfileEntity };
