import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MiniCalendar.css";
import { AnimatePresence, motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";

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

	// Récupère la date sélectionnée depuis la query string (?date=YYYY-MM-DD)
	// const params = new URLSearchParams(location.search);
	// const selectedDate = params.get("date") || getTodayStr();

	// On recupere la date depuis le param finalement !
	const { date } = useParams<{ date: string }>();
	const todayDate = getTodayStr();
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
		selectedDate = todayDate;
	} else {
		selectedDate = date || todayDate;
	}

	// const weekDays = useMemo(
	// 	() => getWeekDays(new Date(selectedDate)),
	// 	[selectedDate],
	// );

	const weekDays = useMemo(
		() => get5WeekDays(new Date(selectedDate)),
		[selectedDate],
	);

	// On gere le calendrier date picker
	const inputRef = useRef<HTMLInputElement>(null);
	const handleIconClick = () => {
		if (inputRef.current) {
			inputRef.current.showPicker
				? inputRef.current.showPicker()
				: inputRef.current.focus();
		}
	};

	//Definition de l'ordre de defilement
	const [prevDate, setPrevDate] = useState(selectedDate);

	const direction = useMemo(() => {
		if (!prevDate) return 0;
		const prev = new Date(prevDate);
		const curr = new Date(selectedDate);
		const diffDays = Math.round(
			(curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
		);
		// diffDays > 0 : glisse vers la droite, < 0 : vers la gauche
		return diffDays;
	}, [selectedDate, prevDate]);

	const handleDayClick = (dateStr: string) => {
		setPrevDate(selectedDate);
		navigate(`/saint-of-the-day/${dateStr}`);
	};

	// Previous weekDays
	// const [prevWeekDays, setPrevWeekDays] = useState<string[]>(
	// 	weekDays.map((d) => formatDate(d)),
	// );
	// useEffect(() => {
	// 	setPrevWeekDays(weekDays.map((d) => formatDate(d)));
	// }, [selectedDate]);

	return (
		<div className="mini-calendar-container">
			<motion.div className="mini-calendar" layout>
				{weekDays.map((d) => {
					const dateStr = formatDate(d);
					const isSelected = dateStr === selectedDate;
					const isToday = dateStr === todayDate;
					const slideX = direction > 0 ? 50 : direction < 0 ? -50 : 0;
					return (
						<motion.button
							key={dateStr}
							layoutId={`mini-calendar-day-${dateStr}`}
							className={`mini-calendar-day${isSelected ? " selected" : ""}${isToday ? " today" : ""}`}
							onClick={() => handleDayClick(dateStr)}
							aria-current={isSelected ? "date" : undefined}
							initial={{ opacity: 0, x: slideX }}
							animate={
								isToday && !isSelected
									? { opacity: 0.5, x: 0 }
									: { opacity: 1, x: 0 }
							}
							exit={{ opacity: 0, x: -slideX }}
							transition={TRANSITIONS.normal}
						>
							<span className="mini-calendar-day-label">
								{d.toLocaleDateString("fr-FR", {
									weekday: "short",
								})}
							</span>
							<span className="mini-calendar-day-num">
								{d.getDate()}
							</span>
						</motion.button>
					);
				})}
			</motion.div>
			<motion.div className="mini-calendar-controls" layout>
				<AnimatePresence mode="wait">
					{selectedDate !== todayDate && (
						<motion.button
							className="calendar-reset-button"
							onClick={() => navigate("/saint-of-the-day")}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							transition={TRANSITIONS.normal}
							aria-label="Revenir à aujourd'hui"
							title="Revenir à aujourd'hui"
						>
							🔄
						</motion.button>
					)}
				</AnimatePresence>

				<motion.div
					className="mini-calendar-date-picker"
					layout="preserve-aspect"
				>
					<button
						type="button"
						className="calendar-emoji-btn"
						onClick={handleIconClick}
						aria-label="Choisir une date"
						title="Choisir une date"
					>
						🗓️
					</button>
					<input
						ref={inputRef}
						type="date"
						style={{
							display: "none",
						}}
						onChange={(e) => {
							if (e.target.value) {
								navigate(`/saint-of-the-day/${e.target.value}`);
							}
						}}
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}
