import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Hero from "./pages/Hero";
import CreateUser from "./pages/CreateUser";
import AccessUser from "./pages/AccessUser";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Hero />} />
				<Route path="/create-user" element={<CreateUser />} />
				<Route path="/access-user" element={<AccessUser />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
