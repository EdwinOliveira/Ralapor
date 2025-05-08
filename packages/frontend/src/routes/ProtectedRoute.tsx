import { Navigate } from "react-router";
import { useAuthenticationContext } from "../context/useAuthenticationContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated, isLoading } = useAuthenticationContext();

	if (isLoading !== false) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated === false) {
		return <Navigate to="/access-user" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
