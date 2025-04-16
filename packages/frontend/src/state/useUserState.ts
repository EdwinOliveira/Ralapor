import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserEntity = {
	id: number;
	username: string;
	email: string;
	phoneNumber: string;
	phoneNumberCode: string;
	accessCode: string;
	createdAt: string;
	updatedAt: string;
};

const useUserState = () => {
	const userSlice = createSlice({
		name: "user",
		initialState: null as UserEntity | null,
		reducers: {
			addUser: (state, action: PayloadAction<UserEntity>) => {
				state = action.payload;
				return state;
			},
		},
	});

	const { addUser } = userSlice.actions;

	return { reducer: userSlice.reducer, addUser };
};

export { useUserState, type UserEntity };
