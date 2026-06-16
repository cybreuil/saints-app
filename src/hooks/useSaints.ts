import type { SaintDetailedResponse, SaintsApiResponse } from "../types/Saint";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export type GetSaintListParams = {
	page?: number;
	perPage?: number;
	languageCode?: string;
	// q?: string;
	// recherche texte, si besoin
	// century?: string;
	// filtre siècle, si besoin
	// sort?: string;
	// clé de tri, si besoin
	// signal?: AbortSignal;
	// optionnel pour annulation
};

const useSaints = () => {
	const getSaintList = async (
		params: GetSaintListParams = {},
	): Promise<SaintsApiResponse> => {
		const { page, perPage, languageCode } = params;

		const url = new URL(`${API_BASE_URL}/saints`);
		const qp = new URLSearchParams();

		qp.set("page", String(page));
		qp.set("per_page", String(perPage));

		if (languageCode && languageCode.trim() !== "") {
			qp.set("language_code", languageCode);
		}
		// if (q && q.trim() !== "") {
		// 	qp.set("q", q);
		// }
		// if (century && century.trim() !== "") {
		// 	qp.set("century", century);
		// }
		// if (sort && sort.trim() !== "") {
		// 	qp.set("sort", sort);
		// }

		url.search = qp.toString();

		const response = await fetch(
			url.toString(),
			// signal ? { signal } : undefined,
		);

		if (!response.ok) {
			// Fournir un message utile pour le debug
			const text = await response.text().catch(() => "");
			throw new Error(
				`Erreur API ${response.status} ${response.statusText} - ${text}`,
			);
		}

		return (await response.json()) as SaintsApiResponse;
	};

	const getSaintBySlug = async (
		slug: string,
		languageCode?: string,
	): Promise<SaintDetailedResponse> => {
		const url = new URL(
			`${API_BASE_URL}/saints/${slug}${languageCode ? `?language_code=${languageCode}` : ""}`,
		);
		const response = await fetch(url.toString());
		if (!response.ok) {
			// Fournir un message utile pour le debug
			const text = await response.text().catch(() => "");
			throw new Error(
				`Erreur API ${response.status} ${response.statusText} - ${text}`,
			);
		}
		return (await response.json()) as SaintDetailedResponse;
	};

	return { getSaintList, getSaintBySlug };
};

export { useSaints };
