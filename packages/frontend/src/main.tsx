import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * Pages
 */
import CreateUser from "./pages/users/create-user/create-user.tsx";
import AccessUser from "./pages/users/access-user/access-user.tsx";
import RecoverUser from "./pages/users/recover-user/recover-user.tsx";
import Landing from "./pages/landing/Landing.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/create-user" element={<CreateUser />} />
				<Route path="/access-user" element={<AccessUser />} />
				<Route path="/recover-user" element={<RecoverUser />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
