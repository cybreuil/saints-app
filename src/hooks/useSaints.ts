import { useEffect, useState } from "react";
import { getSaints, getSaintBySlug } from "../api/saints";
import type { SaintApi, SaintDetailedResponse } from "../types/Saint";

const SEARCH_DEBOUNCE_MS = 600;

function useDebounced<T>(value: T, delay: number): T {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const id = setTimeout(() => {
			setDebounced(value);
		}, delay);

		return () => clearTimeout(id);
	}, [value, delay]);

	return debounced;
}

type UseSaintsParams = {
	page?: number;
	perPage?: number;
	languageCode?: string;
	q?: string;
	century?: string;
	sort?: string;
};

const useSaints = ({
	page = 1,
	perPage = 20,
	languageCode = "en",
	q,
	century,
	sort,
}: UseSaintsParams = {}) => {
	const [saints, setSaints] = useState<SaintApi[] | []>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const debouncedQuery = useDebounced(q, SEARCH_DEBOUNCE_MS);

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);
		setError(null);

		getSaints({
			page,
			perPage,
			languageCode,
			q: debouncedQuery,
			century,
			sort,
			signal: controller.signal,
		})
			.then((response) => {
				setSaints(response.data);
				setTotalCount(response.total);
				setTotalPages(response.total_pages);
			})
			.catch((error) => {
				if (error.name === "AbortError") {
					return;
				}

				setError(
					error instanceof Error
						? error
						: new Error(
								"Impossible to fetch saints data. Please try again later.",
							),
				);
			})
			.finally(() => {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			});

		return () => {
			controller.abort();
		};
	}, [page, perPage, languageCode, debouncedQuery, century, sort]);

	return {
		saints,
		loading,
		error,
		totalCount,
		totalPages,
		debouncedQuery,
	};
};

const useSaintBySlug = (slug: string, languageCode: string) => {
	const [detail, setDetail] = useState<SaintDetailedResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);
		setError(null);

		getSaintBySlug(slug, languageCode, controller.signal)
			.then((data) => {
				setDetail(data);
			})
			.catch((error) => {
				if (error.name === "AbortError") {
					return;
				}

				setError(
					error instanceof Error
						? error
						: new Error(
								"Impossible to fetch saint data. Please try again later.",
							),
				);
			})
			.finally(() => {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			});

		return () => {
			controller.abort();
		};
	}, [slug, languageCode]);

	return {
		detail,
		loading,
		error,
	};
};

export { useSaints, useSaintBySlug };
