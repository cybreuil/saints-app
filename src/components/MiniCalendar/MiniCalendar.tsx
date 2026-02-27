import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullCalendarModal } from "../FullCalendarModal/FullCalendarModal";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
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

// On Gere le calcul des dates en local !
function pad(n: number) {
	return n.toString().padStart(2, "0");
}
// Format Date -> nous donne "YYYY-MM-DD" en LOCAL
function formatYMD(d: Date) {
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Parse "YYYY-MM-DD" as local date (midnight local)
// Note: new Date("YYYY-MM-DD") is parsed as UTC, which can cause off-by-one-day issues depending on timezone. So we parse manually.
function parseYMD(s: string) {
	const [y, m, day] = s.split("-").map(Number);
	return new Date(y, m - 1, day);
}

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

function getTodayStr() {
	return formatYMD(new Date());
}

const MiniCalendar = () => {
	const navigate = useNavigate();
	const [isAnimating, setIsAnimating] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
		isNaN(parseYMD(date).getTime())
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
		() => get5WeekDays(parseYMD(selectedDate)),
		[selectedDate],
	);

	// On gere le calendrier date picker
	const inputRef = useRef<HTMLInputElement>(null);
	const handleIconClick = () => {
		// prefer native picker on small screens
		if (
			window.matchMedia &&
			window.matchMedia("(max-width: 720px)").matches
		) {
			if (inputRef.current) {
				inputRef.current.showPicker
					? inputRef.current.showPicker()
					: inputRef.current.focus();
			}
			return;
		}
		setIsModalOpen(true);
	};

	//Definition de l'ordre de defilement
	const [prevDate, setPrevDate] = useState(selectedDate);

	const direction = useMemo(() => {
		if (!prevDate) return 0;
		const prev = parseYMD(prevDate);
		const curr = parseYMD(selectedDate);
		const diffDays = Math.round(
			(curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
		);
		// diffDays > 0 : glisse vers la droite, < 0 : vers la gauche
		return diffDays;
	}, [selectedDate, prevDate]);

	const handleDayClick = (dateStr: string) => {
		if (isAnimating) return;

		setIsAnimating(true);
		setPrevDate(selectedDate);
		navigate(`/saint-of-the-day/${dateStr}`);

		setTimeout(() => {
			setIsAnimating(false);
		}, 1000); // Durée du délai pour éviter les clics rapides
	};

	const handleCalendarModalDayClick = (dateStr: string) => {
		setIsModalOpen(false);
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
					const dateStr = formatYMD(d);
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
							// exit={{ opacity: 0, x: -slideX }}
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
			<motion.div className="mini-calendar-controls">
				{selectedDate !== todayDate && (
					<motion.button
						className="calendar-reset-button"
						onClick={() => handleDayClick(todayDate)}
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

				<motion.div className="mini-calendar-date-picker" layout>
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
								handleDayClick(e.target.value);
							}
						}}
					/>
				</motion.div>
			</motion.div>
			<FullCalendarModal
				initialDate={selectedDate}
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSelect={(dateStr) => handleCalendarModalDayClick(dateStr)}
			/>
		</div>
	);
};

export { MiniCalendar };
