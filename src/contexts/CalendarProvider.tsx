import React, { useState } from "react";
import { CalendarContext, type CalendarType } from "./CalendarContext";

type CalendarProviderProps = {
	children: React.ReactNode;
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [calendar, setCalendar] = useState<CalendarType>("tridentine_1960");

	return (
		<CalendarContext.Provider value={{ calendar, setCalendar }}>
			{children}
		</CalendarContext.Provider>
	);
};
