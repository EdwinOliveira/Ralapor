import { useEffect, useState } from "react";
import { useFindUserSession } from "../state/users/useCases/useFindUserSession";
import { useUserStore } from "../state/users/useUserStore";
import { AuthenticationContext } from "../context/useAuthenticationContext";
import { useFindUserById } from "../state/users/useCases/useFindUserById";

export const AuthenticationProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { addUser, users } = useUserStore();
	const { findUserSession } = useFindUserSession();
	const { findUserById } = useFindUserById();
	let isAuthenticated = users.length !== 0;

	useEffect(() => {
		const callFindUserSession = async () => {
			const session = await findUserSession();

			if (session !== undefined) {
				const user = await findUserById({ id: session.userId });
				console.log(user);

				if (user !== undefined) {
					addUser(user);
					isAuthenticated = users.length !== 0;
					console.log(isAuthenticated);
				}
			}

			setIsLoading(false);
		};

		callFindUserSession();
	}, [isAuthenticated]);

	return (
		<AuthenticationContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthenticationContext.Provider>
	);
};
