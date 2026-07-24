import { useState, useEffect} from "react";
import { CalendarContext } from "./CalendarContext"
import { getCalendars } from "../api/calendars";
import type { Calendar, CalendarProviderProps } from "../types/Calendar";

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [calendar, setCalendar] = useState<Calendar | null>(null);

	useEffect(() => {
			async function loadCalendar() {
				const calendars = await getCalendars();

				const defaultCalendar = calendars.find((c: Calendar) => c.code === "ROMAN_GENERAL");

				if (defaultCalendar) {
					setCalendar(defaultCalendar);
				}
			}

			loadCalendar();
		}, []);

	return (
		<CalendarContext.Provider value={{ calendar, setCalendar }}>
			{children}
		</CalendarContext.Provider>
	);
};
