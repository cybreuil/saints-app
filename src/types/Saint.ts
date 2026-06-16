export interface Saint {
	id: string;
	name: string;
	feastDay: string;
	description: string;
	biography: string[];
	attributes: string[];
	patronage: string[];
	image: string;
}

//API dto
export interface SaintApi {
	id: string;
	slug: string;
	default_name: string;
	// Name traduit depuis saint_translations
	name: string;
	birth_year: number;
	death_year: number;
	image_url: string;
}
export interface SaintsApiResponse {
	data: SaintApi[];
	page: number;
	// perPage: number;
	total: number;
	total_pages: number;
}
