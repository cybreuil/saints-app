import { useState, useEffect} from "react";
import { CalendarContext } from "./CalendarContext"
import { getCalendars } from "../api/calendars";
import type { Calendar, CalendarProviderProps } from "../types/Calendar";

const STORAGE_KEY = "liturgical_calendar_code";

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [calendar, setCalendarState] = useState<Calendar | null>(null);

	useEffect(() => {
			async function loadCalendar() {
				const calendars = await getCalendars();

				const savedCode = localStorage.getItem(STORAGE_KEY);

				const defaultCalendar = calendars.find((c: Calendar) => c.code === savedCode || c.code === "ROMAN_GENERAL");

				if (defaultCalendar) {
					setCalendarState(defaultCalendar);
				}
			}

			loadCalendar();
		}, []);

	// When the user selects a new calendar, update the state and save it to localStorage
	const setCalendar = (calendar: Calendar) => {
			localStorage.setItem(STORAGE_KEY, calendar.code);
			setCalendarState(calendar);
		};

	return (
		<CalendarContext.Provider value={{ calendar, setCalendar }}>
			{children}
		</CalendarContext.Provider>
	);
};
