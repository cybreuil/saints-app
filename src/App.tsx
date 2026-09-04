import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { BodyClassController } from "./components/BodyClassController/BodyClassController";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { ScrollToTopOnRouteChange } from "./components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";
import { AppRoutes } from "./components/AppRoutes/AppRoutes";

function App() {
	return (
		<>
			<ScrollToTopOnRouteChange />
			<ScrollToTop />
			<Header />
			<BodyClassController />
			<AppRoutes />
			<Footer />
		</>
	);
}

export { App };
