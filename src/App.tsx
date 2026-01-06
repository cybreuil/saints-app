import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { SaintOfTheDay } from "./pages/SaintOfTheDay/SaintOfTheDay";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/saint-of-the-day" element={<SaintOfTheDay />} />
			</Routes>
			<Footer />
		</>
	);
}

export { App };
