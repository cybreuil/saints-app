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
	defaultName: string;
	birthYear: number;
	deathYear: number;
}
export interface SaintsApiResponse {
	data: SaintApi[];
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
}
