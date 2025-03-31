import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserEntity = {
	id: number;
	username: string;
	email: string;
	phoneNumber: string;
	phoneNumberCode: string;
	accessToken: string;
	refreshToken: string;
	createdAt: string;
	updatedAt: string;
};

const UserState = () => {
	const initialState: Array<UserEntity> = [];

	const userSlice = createSlice({
		name: "users",
		initialState,
		reducers: {
			addUser: (users, action: PayloadAction<UserEntity>) => {
				users.push(action.payload);
			},
		},
	});

	const { addUser } = userSlice.actions;

	return { reducer: userSlice.reducer, addUser };
};

export { UserState, type UserEntity };
