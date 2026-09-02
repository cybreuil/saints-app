import { useState, useEffect} from "react";
import { CalendarContext } from "./CalendarContext"
import { getCalendars } from "../api/calendars";
import type { Calendar, CalendarProviderProps } from "../types/Calendar";

const STORAGE_KEY = "liturgical_calendar_code";

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [calendar, setCalendarState] = useState<Calendar | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
			async function loadCalendar() {
				setIsLoading(true);
				setError(null);
				try {
					const calendars = await getCalendars();

					const savedCode = localStorage.getItem(STORAGE_KEY);

					// Minimal language -> calendar mapping
					const navLang = (typeof navigator !== "undefined" && (navigator.language || (navigator.languages && navigator.languages[0]))) || "en";
					const navPrefix = navLang.split("-")[0];

					const langMap: Record<string, string> = {
						fr: "ROMAN_FRANCE",
						pt: "ROMAN_PORTUGAL", // ajuste si ton code est différent
						pl: "ROMAN_POLAND",
						es: "ROMAN_SPAIN",
						en: "ROMAN_GENERAL",
					};

					const preferredCode = savedCode || langMap[navLang] || langMap[navPrefix] || "ROMAN_GENERAL";

					// Try to pick a calendar that matches preferredCode, else ROMAN_GENERAL, else first returned
					const defaultCalendar =
            calendars.find((c: Calendar) => c.code === preferredCode) ??
            calendars.find((c: Calendar) => c.code === "ROMAN_GENERAL") ??
            calendars[0];

				if (!defaultCalendar) {
									throw new Error(
										"No default calendar found. Please check your configuration."
									);
								}

					setCalendarState(defaultCalendar);

			} catch (err) {
					if (err instanceof Error) {
						setError(err);
					} else {
						setError(new Error("An unknown error occurred."));
					}
					setCalendarState(null);
				} finally {
					setIsLoading(false);
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
		<CalendarContext.Provider value={{ calendar, setCalendar, isLoading, error }}>
			{children}
		</CalendarContext.Provider>
	);
};
