import "./CelebrationOfTheDay.css";
import { useEffect } from "react";
import { CalendarSelector } from "../../components/CalendarSelector/CalendarSelector";
import { RegionalSaint } from "../../components/RegionalSaint/RegionalSaint";
import { useCalendar } from "../../hooks/useCalendar";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import { LiturgicalColor } from "../../components/LiturgicalColor/LiturgicalColor";
import { MiniCalendar } from "../../components/MiniCalendar/MiniCalendar";
import { LiturgicalRank } from "../../components/LiturgicalRank/LiturgicalRank";
import { useCelebration } from "../../hooks/useCelebration";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import ReactMarkdown from "react-markdown";
import { Loader } from "../../components/Loader/Loader";

const CelebrationOfTheDay: React.FC = () => {
	const { calendar } = useCalendar();

	const { date: dateParam } = useParams();
	const date = dateParam ?? new Date().toISOString().split("T")[0];

	const { languageCode } = useLanguage();

	//Maybe should put liturgical season as a context
	const {
		celebration,
		saints,
		invalidDate,
		liturgicalSeason,
		isLoading,
		error,
		context,
	} = useCelebration(calendar?.code, date, languageCode);

	const liturgicalColor =
		celebration?.liturgical_color_hex ||
		liturgicalSeason?.hex_color ||
		"#000000";

	useEffect(() => {
		if (!liturgicalColor) return;

		document.body.style.setProperty("--liturgical-color", liturgicalColor);

		return () => {
			document.body.style.removeProperty("--liturgical-color");
		};
	}, [liturgicalColor]);

	return (
		<div className="saint-of-the-day-layout">
			<div className="sidebar-left">
				<div className="sidebar-left-sticky">
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						// layoutId="calendar-container"
					>
						<MiniCalendar />
					</motion.div>

					{/*Logique de facultatif a ajouter si on a pas de couleur dans certains calendriers*/}
					{/*{saint.liturgicalColor && (*/}
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<LiturgicalColor
							color={liturgicalColor}
							colorName={
								celebration?.liturgical_color_name ||
								liturgicalSeason?.color_label ||
								"Inconnu"
							}
						/>
					</motion.div>

					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<LiturgicalRank
							rank={celebration?.rank_label || "Inconnu"}
						/>
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
					<motion.p
						className="no-celebration-message"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						Date invalide. Veuillez choisir une date correcte.
					</motion.p>
				) : isLoading ? (
					<Loader />
				) : error ? (
					<motion.p
						className="error-message"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						Erreur lors du chargement des données : {error.message}
					</motion.p>
				) : !celebration ? (
					<motion.p
						className="no-celebration-message"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						Aucune célébration trouvée pour cette date.
					</motion.p>
				) : (
					<motion.div
						className="saint-of-the-day-content"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<h1>{celebration.feast_name}</h1>
						<p className="feast-day">
							{context?.year}-{context?.month}-{context?.day}
						</p>
						<div className="saint-details">
							{saints && saints.length > 0 ? (
								<>
									{saints[0].saint_image_url && (
										<img
											src={saints[0].saint_image_url}
											alt={saints[0].saint_name}
										/>
									)}
								</>
							) : (
								<p>Aucun saint associé à cette célébration.</p>
							)}

							{/*markdown description*/}

							<ReactMarkdown>
								{celebration.feast_description}
							</ReactMarkdown>

							{/*{saints[0].biography && saint[0].biography.length > 0 && (
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
							)}*/}
						</div>
					</motion.div>
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

export { CelebrationOfTheDay };
