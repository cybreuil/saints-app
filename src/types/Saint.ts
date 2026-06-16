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
	century?: number;
	image_url: string;
}
export interface SaintsApiResponse {
	data: SaintApi[];
	page: number;
	// perPage: number;
	total: number;
	total_pages: number;
}

export interface SaintDetailedResponse {
	id: number;
	slug: string;
	default_name: string;
	birth_year: number | null;
	birth_month: number | null;
	birth_day: number | null;
	birth_is_approximate: boolean | null;
	death_year: number | null;
	death_month: number | null;
	death_day: number | null;
	death_is_approximate: boolean | null;
	century: number | null;
	name: string | null;
	short_description: string | null;
	full_biography: string | null;
}
