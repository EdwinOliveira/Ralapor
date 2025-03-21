import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * Pages
 */
import CreateUser from "./pages/users/CreateUser.tsx";
import AccessUser from "./pages/users/AccessUser.tsx";
import RecoverUser from "./pages/users/RecoverUser.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/create-user" element={<CreateUser />} />
				<Route path="/access-user" element={<AccessUser />} />
				<Route path="/recover-user" element={<RecoverUser />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
