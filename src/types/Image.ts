export type Image = {
	id: number;
	saint_id: number;
	image_url: string;
	title: string;
	image_type?: string;
	alt_text?: string;
	caption?: string;
	creator?: string;
	date_label?: string;
	repository?: string;
	credit?: string;
	license?: string;
	source_url?: string;
	sort_order: number;
	is_primary: boolean;
};
