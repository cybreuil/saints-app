import type {
	SaintDetailedResponse,
	SaintsListApiResponse,
} from "../types/Saint";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export type GetSaintListParams = {
	page?: number;
	perPage?: number;
	languageCode?: string;
	q?: string;
	// recherche texte, si besoin
	century?: string;
	// filtre siècle, si besoin
	sort?: string;
	// clé de tri, si besoin
	// signal?: AbortSignal;
	// optionnel pour annulation
};

const useSaints = () => {
	const getSaintList = async (
		params: GetSaintListParams = {},
	): Promise<SaintsListApiResponse> => {
		const { page, perPage, languageCode, q, century, sort } = params;

		const url = new URL(`${API_BASE_URL}/saints`);
		const qp = new URLSearchParams();

		if (languageCode && languageCode.trim() !== "") {
			qp.set("language_code", languageCode);
		}
		if (q?.trim()) qp.set("q", q.trim());
		if (century && century !== "all") qp.set("century", century);
		if (sort) qp.set("sort", sort);
		qp.set("page", String(page));
		qp.set("per_page", String(perPage));

		url.search = qp.toString();
		const response = await fetch(url.toString());

		if (!response.ok) {
			// Fournir un message utile pour le debug
			const text = await response.text().catch(() => "");
			throw new Error(
				`Erreur API ${response.status} ${response.statusText} - ${text}`,
			);
		}

		return (await response.json()) as SaintsListApiResponse;
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
