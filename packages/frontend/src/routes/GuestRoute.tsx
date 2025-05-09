import { Navigate } from "react-router";
import { useAuthenticationContext } from "../context/useAuthenticationContext";

const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuthenticationContext();

	if (isLoading === true) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated === true) {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{children}</>;
};

export default GuestRoute;
