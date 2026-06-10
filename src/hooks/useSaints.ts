import type { SaintsApiResponse } from "../types/Saint";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const useSaints = () => {
	const getSaints = async (page: number): Promise<SaintsApiResponse> => {
		const response = await fetch(`${API_BASE_URL}/saints?page=${page}`);
		return await response.json();
	};

	return { getSaints };
};

export { useSaints };
