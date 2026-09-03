import { fetchApi } from "./client";
import type { Image } from "../types/Images";

export function getImages() {
	return fetchApi<Image[]>("/images");
}

export function getRandomImages(count: number = 1): Promise<Image[]> {
	const params = new URLSearchParams({
		count: String(count),
	});

	return fetchApi<Image[]>(`/images/random?${params.toString()}`);
}

export function getImagesBySaint(slug: string): Promise<Image[]> {
	return fetchApi<Image[]>(`/images/${slug}`);
}

// WIP API ENDPOINTS - not done yet
