import { create } from "zustand";

type User = {
	id: number;
	roleId: number;
	username: string;
	email: string;
	phoneNumber: string;
	phoneNumberCode: string;
	isTemporaryTerminated: boolean;
	isPermanentlyTerminated: boolean;
	createdAt: string;
	updatedAt: string;
};

type UserStoreSignature = {
	users: User[];
	addUser: (user: User) => void;
	updateUserById: (query: Pick<User, "id">, args: Partial<User>) => void;
};

const useUserStore = create<UserStoreSignature>((set) => {
	return {
		users: [],
		addUser: (user) => {
			return set((state) => ({ users: [...state.users, user] }));
		},
		updateUserById: (query, args) => {
			return set((state) => ({
				users: state.users.map((user) => {
					if (user.id === query.id) {
						user = { ...user, ...args };
					}

					return user;
				}),
			}));
		},
	};
});

export { useUserStore, type User };
