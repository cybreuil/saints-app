import { useMemo, useState } from "react";
import {
	type LanguageCode,
	type LanguageContextValue,
	type LanguageProviderProps,
} from "../types/Language";
import { LanguageContext } from "./LanguageContext";

const LANGUAGES: Record<LanguageCode, string> = {
	en: "English",
	fr: "Français",
	la: "Latina",
};
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
	// We read the saved preference if it exists, otherwise browser language, otherwise default to English
	const [languageCode, setLanguageCode] = useState<LanguageCode>(() => {
		const savedLanguage = localStorage.getItem("language_code");

		if (savedLanguage && savedLanguage in LANGUAGES) {
			return savedLanguage as LanguageCode;
		}

		const browserLanguages = navigator.languages.map(
			(lang) => lang.split("-")[0]
		);

		const detectedLanguage = browserLanguages.find(
			(lang) => lang in LANGUAGES
		);

		return (detectedLanguage as LanguageCode) ?? "en";
	});

	const value = useMemo<LanguageContextValue>(
		() => ({
			languageCode,
			setLanguageCode: (lang) => {
				localStorage.setItem("language_code", lang);
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
