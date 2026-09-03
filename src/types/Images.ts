// CREATE TABLE saint_images (
//     saint_id INTEGER NOT NULL REFERENCES saints(id) ON DELETE CASCADE,
//     image_id INTEGER NOT NULL REFERENCES images(id) ON DELETE CASCADE,

//     sort_order SMALLINT NOT NULL DEFAULT 1,
//     is_primary BOOLEAN NOT NULL DEFAULT FALSE,

//     subject_role TEXT NOT NULL DEFAULT 'subject',
//     alt_text_override TEXT,
//     caption_override TEXT,

//     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

//     PRIMARY KEY (saint_id, image_id)
// );

// Full sql schema for the images table for now - need implement api response type then we'll correct if needed
export type Image = {
	id: number;
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
};
