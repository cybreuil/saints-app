import { useEffect, useState } from "react";
import { getCalendars } from "../api/calendars";
import type { Calendar } from "../types/Calendar";

export const useCalendars = () => {
	const [calendars, setCalendars] = useState<Calendar[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCalendars()
			.then(setCalendars)
			.finally(() => setLoading(false));
	}, []);

	return {
		calendars,
		loading,
	};
};
