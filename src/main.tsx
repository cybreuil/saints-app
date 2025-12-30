import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App.tsx";
import { SaintOfTheDay } from "./pages/SaintOfTheDay/SaintOfTheDay.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/saint-of-the-day" element={<SaintOfTheDay />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
