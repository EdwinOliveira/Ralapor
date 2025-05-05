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
	addUser: (args: User) => void;
	updateUserById: (
		query: Pick<User, "id">,
		args: Partial<Omit<User, "id" | "createdAt">>,
	) => void;
};

const useUserStore = create<UserStoreSignature>((set) => {
	return {
		users: [],
		addUser: (args) => {
			return set((state) => ({ users: [...state.users, args] }));
		},
		updateUserById: (query, args) => {
			return set((state) => ({
				users: state.users.map((user) => {
					return user.id === query.id ? { ...user, ...args } : user;
				}),
			}));
		},
	};
});

export { useUserStore, type User };
