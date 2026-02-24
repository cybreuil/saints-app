import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MiniCalendar.css";

function getWeekDays(date = new Date()) {
	const start = new Date(date);
	start.setDate(date.getDate() - date.getDay() + 1); // Lundi
	return Array.from({ length: 7 }, (_, i) => {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		return d;
	});
}

function formatDate(d: Date) {
	return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getTodayStr() {
	return formatDate(new Date());
}

export function MiniCalendar() {
	const navigate = useNavigate();
	const location = useLocation();

	// Récupère la date sélectionnée depuis la query string (?date=YYYY-MM-DD)
	const params = new URLSearchParams(location.search);
	const selectedDate = params.get("date") || getTodayStr();

	const weekDays = useMemo(
		() => getWeekDays(new Date(selectedDate)),
		[selectedDate],
	);

	return (
		<div className="mini-calendar">
			{weekDays.map((d) => {
				const dateStr = formatDate(d);
				const isSelected = dateStr === selectedDate;
				return (
					<button
						key={dateStr}
						className={`mini-calendar-day${isSelected ? " selected" : ""}`}
						onClick={() =>
							navigate(`/saint-of-the-day?date=${dateStr}`)
						}
						aria-current={isSelected ? "date" : undefined}
					>
						<span className="mini-calendar-day-label">
							{d.toLocaleDateString("fr-FR", {
								weekday: "short",
							})}
						</span>
						<span className="mini-calendar-day-num">
							{d.getDate()}
						</span>
					</button>
				);
			})}
		</div>
	);
}
