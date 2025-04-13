import { useFindUserSession } from "../hooks/useFindUserSession";

export default async function ProtectedRoute() {
	const { findUserSession } = useFindUserSession();
	await findUserSession();

	return {};
}
