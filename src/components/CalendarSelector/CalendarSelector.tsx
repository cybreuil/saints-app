import "./CalendarSelector.css";
import { useState } from "react";

const CalendarSelector = () => {
	const [calendar, setCalendar] = useState<
		"tridentine_1960" | "roman_1970" | "orthodox" | "bonus"
	>("tridentine_1960");

	return (
		<div className="calendar-selector">
			Calendar Selector Component
			<select
				value={calendar}
				onChange={(e) =>
					setCalendar(
						e.target.value as
							| "tridentine_1960"
							| "roman_1970"
							| "orthodox"
							| "bonus",
					)
				}
			>
				<option value="tridentine_1960">Tridentine 1960</option>
				<option value="roman_1970">Roman 1970</option>
				<option value="orthodox">Orthodox</option>
				<option value="bonus">Bonus</option>
			</select>
		</div>
	);
};

export { CalendarSelector };
