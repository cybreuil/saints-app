import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import { App } from "./App.tsx";
import { SaintOfTheDay } from "./pages/SaintOfTheDay/SaintOfTheDay.tsx";
import Saints from "./pages/Saints/Saints.tsx";
import About from "./pages/About/About.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/saint-of-the-day" element={<SaintOfTheDay />} />
					<Route path="/saints" element={<Saints />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	</StrictMode>,
);
