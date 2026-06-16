import { useMemo, useState } from "react";
import {
	type LanguageCode,
	type LanguageContextValue,
	type LanguageProviderProps,
} from "../types/Language";
import { LanguageContext } from "./LanguageContext";

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
	// We read the saved preference if it exists, otherwise default to "en"
	const [languageCode, setLanguageCode] = useState<LanguageCode>(
		() => (localStorage.getItem("languageCode") as LanguageCode) || "en",
	);

	const value = useMemo<LanguageContextValue>(
		() => ({
			languageCode,
			setLanguageCode: (lang) => {
				localStorage.setItem("languageCode", lang); // persistence
				setLanguageCode(lang);
			},
		}),
		[languageCode],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};
