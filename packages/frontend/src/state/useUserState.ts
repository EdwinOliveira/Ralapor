import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserEntity = {
	id: number;
	username: string;
	email: string;
	phoneNumber: string;
	phoneNumberCode: string;
	accessCode: string;
	createdAt: string;
	updatedAt: string;
};

const initialState = {} as UserEntity;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (_state, action: PayloadAction<UserEntity>) => {
			console.log(action.payload);
			console.log(_state.id);
			return action.payload;
		},
	},
});

export const { addUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
