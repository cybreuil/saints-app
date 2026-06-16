import { createContext, useContext } from "react";
import type { LanguageContextValue } from "../types/Language";

const LanguageContext = createContext<LanguageContextValue | undefined>(
	undefined,
);

// Accessor hook + guard if the Provider is forgotten
const useLanguage = () => {
	const ctx = useContext(LanguageContext);
	if (!ctx) {
		throw new Error(
			"useLanguage doit être utilisé dans un <LanguageProvider>",
		);
	}
	return ctx;
};

export { LanguageContext, useLanguage };
