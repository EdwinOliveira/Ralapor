import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { useStore } from "./state/useStore";
import Hero from "./routes/Hero";
import CreateUser from "./routes/CreateUser";
import AccessUser from "./routes/AccessUser";
import RecoverUser from "./routes/RecoverUser";
import CreateProfile from "./routes/CreateProfile";
import CategoryPicker from "./routes/CategoryPicker";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={useStore}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route path="/create-user" element={<CreateUser />} />
					<Route path="/access-user" element={<AccessUser />} />
					<Route path="/recover-user" element={<RecoverUser />} />
					<Route path="/create-profile" element={<CreateProfile />} />
					<Route path="/pick-categories" element={<CategoryPicker />} />
					<Route path="*" element={<p>There's nothing here: 404!</p>} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
