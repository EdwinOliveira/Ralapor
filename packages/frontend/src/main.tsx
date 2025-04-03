import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Hero from "./pages/Hero";
import CreateUser from "./pages/CreateUser";
import AccessUser from "./pages/AccessUser";
import RecoverUser from "./pages/RecoverUser";
import { Provider } from "react-redux";
import { store } from "./state/Store";
import CreateProfile from "./pages/CreateProfile";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route path="/create-user" element={<CreateUser />} />
					<Route path="/access-user" element={<AccessUser />} />
					<Route path="/recover-user" element={<RecoverUser />} />
					<Route path="/create-profile" element={<CreateProfile />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
