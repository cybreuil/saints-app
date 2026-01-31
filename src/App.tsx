import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { SaintOfTheDay } from "./pages/SaintOfTheDay/SaintOfTheDay";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { BodyClassController } from "./components/BodyClassController/BodyClassController";

function App() {
	return (
		<>
			<Header />
			<BodyClassController />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/saint-of-the-day" element={<SaintOfTheDay />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="*" element={<HomePage />} />
			</Routes>
			<Footer />
		</>
	);
}

export { App };
