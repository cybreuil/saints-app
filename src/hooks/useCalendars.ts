import { useEffect, useState } from "react";
import { getCalendars } from "../api/calendars";
import type { Calendar } from "../types/Calendar";

export const useCalendars = (languageCode?: string) => {
	const [calendars, setCalendars] = useState<Calendar[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		getCalendars(languageCode)
			.then(setCalendars)
			.catch(setError)
			.finally(() => setLoading(false));
	}, [languageCode]);

	return {
		calendars,
		loading,
		error,
	};
};
