import React, { useMemo } from "react";
import saintsData from "../../data/saints.json";
import "./SaintOfTheDay.css";
import { CalendarSelector } from "../../components/CalendarSelector/CalendarSelector";
import { RegionalSaint } from "../../components/RegionalSaint/RegionalSaint";
import { useCalendar } from "../../hooks/useCalendar";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";

const getTodayKey = () => {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	return `${month}-${day}`;
};

const SaintOfTheDay: React.FC = () => {
	const { calendar } = useCalendar();

	const saint = useMemo(() => {
		const todayKey = getTodayKey();
		const calendarData = saintsData.calendars[calendar as keyof typeof saintsData.calendars];
		if (!calendarData || !calendarData.saints) return null;
		const saints = calendarData.saints[todayKey as keyof typeof calendarData.saints] || [];
		return saints.length > 0 ? saints[0] : null;
	}, [calendar]);

	if (!saint) {
		return (
			<div className="saint-of-the-day-container">
				<p className="no-saint-message">
					Aucun saint trouvé pour aujourd'hui.
				</p>
			</div>
		);
	}

	return (
		<div className="saint-of-the-day-layout">
			<div className="sidebar-left" />

			<motion.div
				className="saint-of-the-day-card"
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				transition={TRANSITIONS.normal}
			>
				<h2>Saint du jour</h2>
				<h1>{saint.name}</h1>
				<p className="feast-day">{saint.feastDay}</p>
				<div className="saint-details">
					{saint.image && <img src={saint.image} alt={saint.name} />}
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
					{saint.attributes && saint.attributes.length > 0 && (
						<div className="attributes-section">
							<h3>Attributes</h3>
							<ul>
								{saint.attributes.map((attr, idx) => (
									<li key={idx}>{attr}</li>
								))}
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
