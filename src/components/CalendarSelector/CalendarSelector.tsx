import "./CalendarSelector.css";
import { useCalendar } from "../../hooks/useCalendar";
import { useCalendars } from "../../hooks/useCalendars";

const CalendarSelector = () => {
	const { calendar, setCalendar } = useCalendar();
	const {calendars} = useCalendars();
	console.log("CalendarSelector render");
	console.log("calendars:", calendars);

	return (
		<div className="calendar-selector">
			<h3>Liturgical Calendar</h3>
			<select
				disabled={!calendars.length}
				value={calendar?.code || ""}
				onChange={(e) => {
					const selectedCalendar = calendars.find(
						(c) => c.code === e.target.value,
					);
					if (selectedCalendar) {
						setCalendar(selectedCalendar);
					}
				}}
			>
				{calendars.map((c) => (
					<option key={c.code} value={c.code}>
						{c.name}
					</option>
				))}
			</select>
		</div>
	);
};

export { CalendarSelector };
