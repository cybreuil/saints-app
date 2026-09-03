import { fetchApi } from "./client";
import type { Image, ImageApiResponse } from "../types/Images";

export function getCelebrations() {
	return fetchApi<Celebration[]>("/celebrations");
}

export function getCelebrationByDate(
	calendarCode: string,
	languageCode: string,
	date: Date,
): Promise<CelebrationApiResponse> {
	const year = String(date.getFullYear());
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	const params = new URLSearchParams({
		calendar_code: calendarCode,
		language_code: languageCode,
		year,
		month,
		day,
	});

	return fetchApi<CelebrationApiResponse>(
		`/celebrations/by-date?${params.toString()}`,
	);
}
