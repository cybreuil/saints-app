export type LanguageCode = "fr" | "en" | "la"; // all languages available

export type LanguageContextValue = {
	languageCode: LanguageCode;
	setLanguageCode: (lang: LanguageCode) => void;
	t: (key: string) => string;
};

export type LanguageProviderProps = {
	children: React.ReactNode;
};
