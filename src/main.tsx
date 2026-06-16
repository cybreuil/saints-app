import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/reset.css";
import "./styles/variables.css";
import "./index.css";
import { CalendarProvider } from "./contexts/CalendarProvider.tsx";
import { LanguageProvider } from "./contexts/LanguageProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<LanguageProvider>
				<CalendarProvider>
					<App />
				</CalendarProvider>
			</LanguageProvider>
		</BrowserRouter>
	</StrictMode>,
);
