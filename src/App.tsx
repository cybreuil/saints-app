import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { BodyClassController } from "./components/BodyClassController/BodyClassController";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { AppRoutes } from "./components/AppRoutes/AppRoutes";

function App() {
	return (
		<>
			<ScrollToTop />
			<Header />
			<BodyClassController />
			<AppRoutes />
			<Footer />
		</>
	);
}

export { App };
