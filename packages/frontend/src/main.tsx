import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./index.css";
import Hero from "./routes/hero";
import CreateUser from "./routes/createUser";
import AccessUser from "./routes/accessUser";
import RecoverUser from "./routes/recoverUser";
import CreateProfile from "./routes/createProfile";

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
