import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./state/Store";
import Hero from "./routes/Hero";
import CreateUser from "./routes/CreateUser";
import AccessUser from "./routes/AccessUser";
import RecoverUser from "./routes/RecoverUser";
import CreateProfile from "./routes/CreateProfile";

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
