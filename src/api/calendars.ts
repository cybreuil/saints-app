import { fetchApi } from "./client";
import type { Calendar } from "../types/Calendar";

export function getCalendars(languageCode: string): Promise<Calendar[]> {
	const params = new URLSearchParams({
		language_code: languageCode,
	});

	return fetchApi<Calendar[]>(`/calendars?${params.toString()}`);
}
