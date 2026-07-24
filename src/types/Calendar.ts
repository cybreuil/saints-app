export type Calendar = {
	code: string;
	name: string;
	description: string;
	parent_id: number | null;
	parent_code: string | null;
	date_system: "gregorian" | "julian";
	easter_computation: "western" | "eastern";
	is_active: boolean;
	created_at: string;
};

export type CalendarContext = {
	calendar: Calendar | null;
	setCalendar: (calendar: Calendar) => void;
};

export type CalendarProviderProps = {
	children: React.ReactNode;
};
