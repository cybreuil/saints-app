import { fetchApi } from "./client";
import { type ImagesListApiResponse, type Image } from "../types/Image";

export function getImages(
	page: number = 1,
	perPage: number = 20,
): Promise<ImagesListApiResponse> {
	return fetchApi<ImagesListApiResponse>(
		`/images?page=${page}&per_page=${perPage}`,
	);
}

export function getRandomImages(count: number = 1): Promise<Image[]> {
	const params = new URLSearchParams({
		count: String(count),
	});

	return fetchApi<Image[]>(`/saints/random-images?${params.toString()}`);
}
// WIP API ENDPOINTS - not done yet
