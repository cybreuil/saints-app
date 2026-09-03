import { fetchApi } from "./client";
import type { Image } from "../types/Image";

export function getImages() {
	return fetchApi<Image[]>("/images");
}

export function getRandomImages(count: number = 1): Promise<Image[]> {
	const params = new URLSearchParams({
		count: String(count),
	});

	return fetchApi<Image[]>(`/saints/random-images?${params.toString()}`);
}
// WIP API ENDPOINTS - not done yet
