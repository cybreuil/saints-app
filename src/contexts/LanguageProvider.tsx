import { useMemo, useState } from "react";
import {
	type LanguageCode,
	type LanguageContextValue,
	type LanguageProviderProps,
	type TranslationVars,
} from "../types/Language";
import { LanguageContext } from "./LanguageContext";

// Import of UI translation files
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import la from "../locales/la.json";

const TRANSLATIONS = {
	en,
	fr,
	la,
};

// Function to get the translation for a given key and language code
const getTranslation = (translations: object, key: string): string => {
	const keys = key.split(".");
	let value: unknown = translations;

	for (const keyPart of keys) {
		if (
			typeof value !== "object" ||
			value === null ||
			!(keyPart in value)
		) {
			return key;
		}

		value = (value as Record<string, unknown>)[keyPart];
	}

	return typeof value === "string" ? value : key;
};

// Le latin n'est pas dans CLDR : Intl.PluralRules renverrait "other" pour tout
const pluralCategory = (languageCode: LanguageCode, count: number): string => {
	if (Intl.PluralRules.supportedLocalesOf(languageCode).length === 0) {
		return count === 1 ? "one" : "other";
	}
	return new Intl.PluralRules(languageCode).select(count);
};

const translate = (
	languageCode: LanguageCode,
	key: string,
	vars?: TranslationVars,
): string => {
	const translations = TRANSLATIONS[languageCode];

	// Si `count` est fourni, on cherche d'abord la clé pluralisée (key_one, key_other…)
	let str: string | undefined;
	if (typeof vars?.count === "number") {
		const pluralKey = `${key}_${pluralCategory(languageCode, vars.count)}`;
		const found = getTranslation(translations, pluralKey);
		if (found !== pluralKey) str = found;
	}
	str ??= getTranslation(translations, key);

	if (!vars) return str;
	return str.replace(/\{(\w+)\}/g, (match, name) =>
		name in vars ? String(vars[name]) : match,
	);
};

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
			(lang) => lang.split("-")[0],
		);

		const detectedLanguage = browserLanguages.find(
			(lang) => lang in LANGUAGES,
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
			t: (key, vars) => translate(languageCode, key, vars),
		}),
		[languageCode],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};
