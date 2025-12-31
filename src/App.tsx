import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { SaintOfTheDay } from "./pages/SaintOfTheDay/SaintOfTheDay";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/saint-of-the-day" element={<SaintOfTheDay />} />
			</Routes>
		</>
	);
}

export { App };
