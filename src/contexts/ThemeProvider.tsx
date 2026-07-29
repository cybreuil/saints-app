import { useState, useEffect} from "react";
import { ThemeContext } from "./ThemeContext"
import type { Theme } from "../types/Theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {

	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem("theme");

		if (savedTheme === "light" || savedTheme === "dark") {
			return savedTheme;
		}

		// Maybe i should a "system" option to match system continuously
		return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
	});

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () =>
		setTheme((t) => (t === "light" ? "dark" : "light"));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
    		{children}
		</ThemeContext.Provider>
	);
}
