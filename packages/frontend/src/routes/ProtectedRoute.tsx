import { Navigate } from "react-router";
import { useAuthenticationContext } from "../context/useAuthenticationContext";
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated, isLoading } = useAuthenticationContext();

	useEffect(() => {
		console.log("ProtectedRoute re-rendering", { isAuthenticated, isLoading });
	}, [isAuthenticated, isLoading]); // Track context changes

	if (isLoading !== false) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated === false) {
		return <Navigate to="/access-user" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
