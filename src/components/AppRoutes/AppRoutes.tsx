import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/HomePage";
import { CelebrationOfTheDay } from "../../pages/CelebrationOfTheDay/CelebrationOfTheDay";
import { SaintsPage } from "../../pages/SaintsPage/SaintsPage";
import { SearchPage } from "../../pages/SearchPage/SearchPage";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/celebration" element={<CelebrationOfTheDay />} />
			<Route
				path="/celebration/:date"
				element={<CelebrationOfTheDay />}
			/>
			<Route path="/saints" element={<SaintsPage />} />
			<Route path="/search" element={<SearchPage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export { AppRoutes };
