import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/reset.css";
import "./styles/variables.css";
import "./index.css";
import { CalendarProvider } from "./contexts/CalendarProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<CalendarProvider>
				<App />
			</CalendarProvider>
		</BrowserRouter>
	</StrictMode>,
);
