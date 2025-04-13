import { useState } from "react";
import type { UserEntity } from "../state/userState";

const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useState<UserEntity>();

	return {};
};

export { useCurrentUser };
