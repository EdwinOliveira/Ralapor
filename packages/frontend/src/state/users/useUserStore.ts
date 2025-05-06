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
	findUsers: () => Array<User>;
	findUserById: (query: Pick<User, "id">) => User | undefined;
	addUser: (args: User) => void;
	updateUserById: (
		query: Pick<User, "id">,
		args: Partial<Omit<User, "id" | "createdAt">>,
	) => void;
};

const useUserStore = create<UserStoreSignature>((set, get) => {
	return {
		users: [],
		findUsers: () => {
			return get().users;
		},
		findUserById: (query) => {
			return get().users.find((user) => user.id === query.id);
		},
		addUser: (args) => {
			console.log(args);
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
