import "./CalendarSelector.css";
import { useCalendar } from "../../hooks/useCalendar";

const CalendarSelector = () => {
	const { calendar, setCalendar } = useCalendar();

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
							| "bonus"
							| "france"
							| "italy"
							| "spain"
							| "poland"
							| "ireland",
					)
				}
			>
				<option value="tridentine_1960">Tridentine 1960</option>
				<option value="roman_1970">Roman 1970 (Modern)</option>
				<option value="orthodox">Orthodox</option>
				<option value="france">France (Regional)</option>
				<option value="italy">Italy (Regional)</option>
				<option value="spain">Spain (Regional)</option>
				<option value="poland">Poland (Regional)</option>
				<option value="ireland">Ireland (Regional)</option>
				<option value="bonus">Bonus Saints</option>
			</select>
		</div>
	);
};

export { CalendarSelector };
