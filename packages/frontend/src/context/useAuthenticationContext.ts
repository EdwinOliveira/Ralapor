import { createContext, useContext } from "react";

const AuthenticationContext = createContext<{
	isAuthenticated: boolean;
	isLoading: boolean;
}>({
	isAuthenticated: false,
	isLoading: true,
});

const useAuthenticationContext = () => useContext(AuthenticationContext);

export { useAuthenticationContext, AuthenticationContext };
