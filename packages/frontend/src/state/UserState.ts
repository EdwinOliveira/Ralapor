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

const UserState = () => {
	const userSlice = createSlice({
		name: "users",
		initialState: new Array<UserEntity>(),
		reducers: {
			addUser: (state, action: PayloadAction<UserEntity>) => {
				state.push(action.payload);
				return state;
			},
		},
	});

	const { addUser } = userSlice.actions;

	return { reducer: userSlice.reducer, addUser };
};

export { UserState, type UserEntity };
