import { useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./MiniCalendar.css";

// function getWeekDays(date = new Date()) {
// 	const start = new Date(date);
// 	start.setDate(date.getDate() - date.getDay() + 1); // Lundi
// 	return Array.from({ length: 7 }, (_, i) => {
// 		const d = new Date(start);
// 		d.setDate(start.getDate() + i);
// 		return d;
// 	});
// }

// Version 5 jours (autour de la date sélectionnée)
const get5WeekDays = (date = new Date()) => {
	const start = new Date(date);
	start.setDate(date.getDate() - 2); // 2 jours avant
	return Array.from({ length: 5 }, (_, i) => {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		return d;
	});
};

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
	// const params = new URLSearchParams(location.search);
	// const selectedDate = params.get("date") || getTodayStr();

	// On recupere la date depuis le param finalement !
	const { date } = useParams<{ date: string }>();
	let selectedDate = "";
	if (
		date &&
		!/^\d{4}-\d{2}-\d{2}$/.test(date) &&
		isNaN(new Date(date).getTime())
	) {
		// Si la date n'est pas au format YYYY-MM-DD ou n'est pas une date valide, on ignore et on utilise aujourd'hui
		console.warn(
			"Date invalide dans l'URL, utilisation de la date du jour",
		);
		selectedDate = getTodayStr();
	} else {
		selectedDate = date || getTodayStr();
	}

	// const weekDays = useMemo(
	// 	() => getWeekDays(new Date(selectedDate)),
	// 	[selectedDate],
	// );

	const weekDays = useMemo(
		() => get5WeekDays(new Date(selectedDate)),
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
						onClick={() => navigate(`/saint-of-the-day/${dateStr}`)}
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
