import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import saintsData from "../../data/saints.json";
import "./SaintOfTheDay.css";
import { CalendarSelector } from "../../components/CalendarSelector/CalendarSelector";
import { RegionalSaint } from "../../components/RegionalSaint/RegionalSaint";
import { useCalendar } from "../../hooks/useCalendar";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import { LiturgicalColor } from "../../components/LiturgicalColor/LiturgicalColor";
import { MiniCalendar } from "../../components/MiniCalendar/MiniCalendar";

const getTodayKey = () => {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	return `${month}-${day}`;
};

// Convertit une date "YYYY-MM-DD" en "MM-DD"
const getKeyFromDate = (dateStr: string) => {
	const [year, month, day] = dateStr.split("-");
	if (month && day) return `${month}-${day}`;
	return getTodayKey();
};

const isValidDate = (dateStr: string) => {
	// Vérifie le format YYYY-MM-DD
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateStr)) return false;
	const date = new Date(dateStr);
	// Vérifie que la date existe vraiment (évite 2024-02-31)
	return (
		!isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr
	);
};

const SaintOfTheDay: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { calendar } = useCalendar();
	const { date } = useParams<{ date: string }>();

	const { saint, invalidDate } = useMemo(() => {
		if (date && !isValidDate(date))
			return { saint: null, invalidDate: true };
		const key = date ? getKeyFromDate(date) : getTodayKey();
		const calendarData =
			saintsData.calendars[calendar as keyof typeof saintsData.calendars];
		if (!calendarData || !calendarData.saints)
			return { saint: null, invalidDate: false };
		const saints =
			calendarData.saints[key as keyof typeof calendarData.saints] || [];
		return {
			saint: saints.length > 0 ? saints[0] : null,
			invalidDate: false,
		};
	}, [calendar, date]);

	// if (!saint) {
	// 	return (
	// 		<div className="saint-of-the-day-container">
	// 			<p className="no-saint-message">
	// 				Aucun saint trouvé pour aujourd'hui.
	// 			</p>
	// 		</div>
	// 	);
	// }

	return (
		<div className="saint-of-the-day-layout">
			<div className="sidebar-left">
				<div className="sidebar-left-sticky">
					{/*Logique de facultatif a ajouter si on a pas de couleur dans certains calendriers*/}
					{/*{saint.liturgicalColor && (*/}
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<LiturgicalColor color="#B22222" colorName="Rouge" />
					</motion.div>

					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<MiniCalendar />
					</motion.div>
				</div>
			</div>

			<motion.div
				className="saint-of-the-day-card"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={TRANSITIONS.slower}
			>
				{invalidDate ? (
					<p className="no-saint-message">
						Date invalide. Veuillez choisir une date correcte.
					</p>
				) : !saint ? (
					<p className="no-saint-message">
						Aucun saint trouvé pour cette date.
					</p>
				) : (
					<div className="saint-of-the-day-content">
						<h1>{saint.name}</h1>
						<p className="feast-day">{saint.feastDay}</p>
						<div className="saint-details">
							{saint.image && (
								<img src={saint.image} alt={saint.name} />
							)}
							<p>{saint.description}</p>
							{saint.biography && saint.biography.length > 0 && (
								<div>
									<h3>Biography</h3>
									<ul>
										{saint.biography.map((line, idx) => (
											<li key={idx}>{line}</li>
										))}
									</ul>
								</div>
							)}
							{saint.attributes &&
								saint.attributes.length > 0 && (
									<div className="attributes-section">
										<h3>Attributes</h3>
										<ul>
											{saint.attributes.map(
												(attr, idx) => (
													<li key={idx}>{attr}</li>
												),
											)}
										</ul>
									</div>
								)}
							{saint.patronage && saint.patronage.length > 0 && (
								<div className="patronage-section">
									<h3>Patronage</h3>
									<ul>
										{saint.patronage.map((pat, idx) => (
											<li key={idx}>{pat}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
			</motion.div>

			<div className="sidebar-right">
				<div className="sidebar-right-sticky">
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<CalendarSelector />
					</motion.div>
					<motion.div
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{
							duration: 0.7,
							delay: 0.4,
							type: "spring",
						}}
					>
						<RegionalSaint />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export { SaintOfTheDay };
