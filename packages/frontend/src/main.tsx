import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./i18n";
import CreateUser from "./routes/CreateUser";
import Hero from "./routes/Hero";
import AccessUser from "./routes/AccessUser";
import RecoverUser from "./routes/RecoverUser";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<p>There's nothing here: 404!</p>} />
				<Route path="/hero" element={<Hero />} />
				<Route path="/create-user" element={<CreateUser />} />
				<Route path="/access-user" element={<AccessUser />} />
				<Route path="/recover-user" element={<RecoverUser />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
