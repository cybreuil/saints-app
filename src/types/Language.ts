export type LanguageCode = "fr" | "en" | "la"; // all languages available

export type TranslationVars = Record<string, string | number>;

export type LanguageContextValue = {
	languageCode: LanguageCode;
	setLanguageCode: (lang: LanguageCode) => void;
	t: (key: string, vars?: TranslationVars) => string;
};

export type LanguageProviderProps = {
	children: React.ReactNode;
};
