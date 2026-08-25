import { useEffect, useState } from "react";
import { getCalendars } from "../api/calendars";
import type { Calendar } from "../types/Calendar";

export const useCalendars = () => {
	const [calendars, setCalendars] = useState<Calendar[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		getCalendars()
			.then(setCalendars)
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);

	return {
		calendars,
		loading,
		error
	};
};
