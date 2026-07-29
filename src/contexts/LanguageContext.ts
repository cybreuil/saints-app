import { createContext } from "react";
import type { LanguageContextValue } from "../types/Language";

const LanguageContext = createContext<LanguageContextValue | undefined>(
	undefined,
);

export { LanguageContext };
