import { useMemo } from "react";
import "./CalendarSelector.css";
import { useCalendar } from "../../hooks/useCalendar";
import { useCalendars } from "../../hooks/useCalendars";
import {
	flattenCalendars,
} from "../../utils/flattenCalendars";

const CalendarSelector = () => {
	const { calendar, setCalendar } = useCalendar();
	const { calendars, loading, error } = useCalendars();

	const options = useMemo(
		() => flattenCalendars(calendars),
		[calendars],
	);

	return (
		<div className="calendar-selector">
			<h3>Liturgical Calendar</h3>

			<select
				disabled={!calendars.length || loading || !!error}
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
				{!calendars.length && !loading && !error &&(
						<option value="">
							No Calendar Available
						</option>
				)}
				{loading && (
					<option value="">
						Loading Calendars...
					</option>
				)}
				{error && (
					<option value="">
						Error Loading Calendars
					</option>
				)}
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
