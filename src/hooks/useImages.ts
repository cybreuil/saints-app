import { useEffect, useState } from "react";
import { getRandomImages } from "../api/images";
import type { Image } from "../types/Image";

export function useRandomImages(count = 10) {
	const [images, setImages] = useState<Image[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		getRandomImages(count)
			.then(setImages)
			.catch(setError)
			.finally(() => setLoading(false));
	}, [count]);

	return {
		images,
		loading,
		error,
	};
}
