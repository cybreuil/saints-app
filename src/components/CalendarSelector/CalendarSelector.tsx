import { useMemo } from "react";
import "./CalendarSelector.css";
import { useCalendar } from "../../hooks/useCalendar";
import { useCalendars } from "../../hooks/useCalendars";
import {
	flattenCalendars,
} from "../../utils/flattenCalendars";

const CalendarSelector = () => {
	const { calendar, setCalendar } = useCalendar();
	const { calendars } = useCalendars();

	const options = useMemo(
		() => flattenCalendars(calendars),
		[calendars],
	);

	return (
		<div className="calendar-selector">
			<h3>Liturgical Calendar</h3>

			<select
				disabled={!calendars.length}
				value={calendar?.code ?? ""}
				onChange={(e) => {
					const selectedCalendar = calendars.find(
						(c) => c.code === e.target.value,
					);

					if (selectedCalendar) {
						setCalendar(selectedCalendar);
					}
				}}
			>
				{options.map((c) => (
					<option key={c.code} value={c.code}>
						{"\u00A0\u00A0".repeat(c.depth)}
						{c.depth > 0 ? "↳ " : ""}
						{c.name}
					</option>
				))}
			</select>
		</div>
	);
};

export { CalendarSelector };
