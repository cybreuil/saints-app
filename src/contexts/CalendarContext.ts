import { createContext } from "react";

export type CalendarType =
	| "tridentine_1960"
	| "roman_1970"
	| "orthodox"
	| "bonus";

type CalendarContextType = {
	calendar: CalendarType;
	setCalendar: (calendar: CalendarType) => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
	undefined,
);

export { CalendarContext };
