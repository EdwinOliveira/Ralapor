import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import type { RootState } from "../state/useStore";
import type { UserEntity } from "../state/useUserState";
import { useFindUserById } from "../hooks/useFindUserById";
import AccessUser from "../routes/AccessUser";
import { useEffect, useState } from "react";

const IsAuthenticated = () => {
	const user = useSelector<RootState, UserEntity | null>((state) => state.user);
	const { findUserById } = useFindUserById();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const checkAuthentication = async () => {
			if (user === null) return;

			const foundUser = await findUserById({ id: user.id });
			if (foundUser !== undefined) setIsAuthenticated(true);
		};

		checkAuthentication();
	}, [user, findUserById]);

	return isAuthenticated ? <Outlet /> : <AccessUser />;
};

export default IsAuthenticated;
