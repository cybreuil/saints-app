import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { SaintOfTheDay } from "./pages/SaintOfTheDay/SaintOfTheDay";
import { SaintsPage } from "./pages/SaintsPage/SaintsPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { BodyClassController } from "./components/BodyClassController/BodyClassController";
import { SearchPage } from "./pages/SearchPage/SearchPage";

function App() {
	return (
		<>
			<Header />
			<BodyClassController />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/saint-of-the-day" element={<SaintOfTheDay />} />
				<Route
					path="/saint-of-the-day/:date"
					element={<SaintOfTheDay />}
				/>
				<Route path="/saints" element={<SaintsPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="*" element={<HomePage />} />
			</Routes>
			<Footer />
		</>
	);
}

export { App };
