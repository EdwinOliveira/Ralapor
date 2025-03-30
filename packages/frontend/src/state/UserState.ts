import { createSlice } from "@reduxjs/toolkit";

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
		reducers: {},
	});

	return { reducer: userSlice.reducer };
};

export { UserState, type UserEntity };
