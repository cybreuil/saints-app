import { createContext } from "react";
import type { Calendar } from "../types/Calendar";

interface CalendarContext {
	calendar: Calendar | null;
	setCalendar: (calendar: Calendar) => void;
}



const CalendarContext = createContext<CalendarContext | undefined>(
	undefined,
);

export { CalendarContext };
