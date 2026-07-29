import { createContext } from "react";
import type { Theme } from "../types/Theme";

interface ThemeContext {
	theme: Theme;
	toggleTheme: () => void;
}



const ThemeContext = createContext<ThemeContext | undefined>(
	undefined,
);

export { ThemeContext };
