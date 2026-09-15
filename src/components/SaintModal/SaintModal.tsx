import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./SaintModal.css";
import { TRANSITIONS } from "../../styles/theme";
import type { SaintApi, SaintDetailedResponse } from "../../types/Saint";
import { useSaints } from "../../hooks/useSaints";
import { useLanguage } from "../../hooks/useLanguage";
import { toRoman } from "../SaintCardSmall/SaintCardSmall";

/* ===== Animation presets ===== */

const EASE = [0.22, 1, 0.36, 1] as const;

const bodyGroup = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const rise = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const exitFade = { opacity: 0, transition: { duration: 0.15 } };

/* ===== Helpers ===== */

function centuryLabel(century: number | null | undefined): string | null {
	if (century == null) return null;
	return `${toRoman(century)}${century === 1 ? "er" : "e"} siècle`;
}

type PartialDate = {
	year: number | null | undefined;
	month?: number | null;
	day?: number | null;
	approximate?: boolean | null;
};

function formatPartialDate(
	{ year, month, day, approximate }: PartialDate,
	languageCode: string,
): string {
	if (year == null) return "—";
	const prefix = approximate ? "v. " : "";
	if (year < 0) return `${prefix}${Math.abs(year)} av. J.-C.`;
	if (month == null) return `${prefix}${year}`;

	try {
		const date = new Date(year, month - 1, day ?? 1);
		date.setFullYear(year); // années < 100
		const options: Intl.DateTimeFormatOptions =
			day == null
				? { month: "long", year: "numeric" }
				: { day: "numeric", month: "long", year: "numeric" };
		return (
			prefix + new Intl.DateTimeFormat(languageCode, options).format(date)
		);
	} catch {
		return `${prefix}${year}`;
	}
}

function TagList({
	title,
	items,
}: {
	title: string;
	items: string[] | null | undefined;
}) {
	const hasItems = Array.isArray(items) && items.length > 0;
	return (
		<div className="saint-modal__list">
			<h3 className="saint-modal__eyebrow-title">{title}</h3>
			{hasItems ? (
				<ul className="saint-modal__tags">
					{items.map((item) => (
						<li key={item} className="saint-tag">
							{item}
						</li>
					))}
				</ul>
			) : (
				<p className="saint-modal__placeholder">À venir</p>
			)}
		</div>
	);
}

/* ===== Component ===== */

export function SaintModal({
	saint,
	onClose,
}: {
	saint: SaintApi;
	onClose: () => void;
}) {
	const { getSaintBySlug } = useSaints();
	const { languageCode } = useLanguage();

	const [detail, setDetail] = useState<SaintDetailedResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// getSaintBySlug est recréé à chaque render : on passe par une ref
	// pour garder des deps propres sans relancer le fetch en boucle.
	const getSaintBySlugRef = useRef(getSaintBySlug);
	useEffect(() => {
		getSaintBySlugRef.current = getSaintBySlug;
	});

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);

		getSaintBySlugRef
			.current(saint.slug, languageCode)
			.then((data) => {
				if (!cancelled) setDetail(data);
			})
			.catch((e: unknown) => {
				console.error(e);
				if (!cancelled) setError("Impossible de charger la fiche.");
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [saint.slug, languageCode]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const imageUrl = saint.image_url || detail?.image_url || null;
	const name = detail?.name || saint.name || saint.default_name;
	const century = detail?.century ?? saint.century ?? null;
	const eyebrow =
		saint.life_label || detail?.life_label || centuryLabel(century);
	const titleId = `saint-modal-title-${saint.id}`;

	return createPortal(
		<>
			{/* AnimatePresence est géré par la page parente */}
			<motion.div
				className="saint-modal__backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				transition={TRANSITIONS.normal}
			/>

			<motion.div
				className="saint-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				layoutId={`saint-${saint.id}`}
				transition={TRANSITIONS.normal}
			>
				{/* --- Cover --- */}
				<header
					className={`saint-modal__cover${
						imageUrl ? "" : " saint-modal__cover--no-image"
					}`}
				>
					{imageUrl && (
						<motion.img
							className="saint-modal__cover-image"
							layoutId={`saint-img-${saint.id}`}
							src={imageUrl}
							alt={name}
							decoding="async"
							transition={TRANSITIONS.normal}
						/>
					)}
					<div className="saint-modal__shade" aria-hidden="true" />

					<motion.button
						type="button"
						className="saint-modal__close"
						onClick={onClose}
						aria-label="Fermer"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={exitFade}
						transition={{ ...TRANSITIONS.normal, delay: 0.1 }}
					>
						×
					</motion.button>

					<div className="saint-modal__cover-text">
						{eyebrow && (
							<motion.span
								className="saint-modal__eyebrow"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={exitFade}
								transition={{
									duration: 0.5,
									ease: EASE,
									delay: 0.15,
								}}
							>
								{eyebrow}
							</motion.span>
						)}
						<motion.h2
							id={titleId}
							className="saint-modal__title"
							layoutId={`saint-name-${saint.id}`}
							transition={TRANSITIONS.normal}
						>
							{name}
						</motion.h2>
					</div>
				</header>

				{/* --- Corps --- */}
				<motion.div
					className="saint-modal__body"
					variants={bodyGroup}
					initial="hidden"
					animate="show"
					exit={exitFade}
				>
					<motion.dl className="saint-modal__facts" variants={rise}>
						<div className="saint-fact">
							<dt>Naissance</dt>
							<dd>
								{formatPartialDate(
									{
										year: detail?.birth_year,
										month: detail?.birth_month,
										day: detail?.birth_day,
										approximate:
											detail?.birth_is_approximate,
									},
									languageCode,
								)}
								{detail?.birth_place && (
									<span className="saint-fact__note">
										{detail.birth_place}
									</span>
								)}
							</dd>
						</div>
						<div className="saint-fact">
							<dt>Mort</dt>
							<dd>
								{formatPartialDate(
									{
										year: detail?.death_year,
										month: detail?.death_month,
										day: detail?.death_day,
										approximate:
											detail?.death_is_approximate,
									},
									languageCode,
								)}
								{detail?.death_place && (
									<span className="saint-fact__note">
										{detail.death_place}
									</span>
								)}
							</dd>
						</div>
						<div className="saint-fact">
							<dt>Siècle</dt>
							<dd>{century != null ? toRoman(century) : "—"}</dd>
						</div>
					</motion.dl>

					<motion.div className="saint-modal__prose" variants={rise}>
						{loading ? (
							<div
								className="saint-modal__skeleton"
								aria-busy="true"
							>
								<span />
								<span />
								<span />
							</div>
						) : error ? (
							<p className="saint-modal__error">{error}</p>
						) : (
							<>
								{detail?.short_description && (
									<p className="saint-modal__lead">
										{detail.short_description}
									</p>
								)}
								{detail?.full_biography ? (
									<div className="saint-modal__markdown">
										<ReactMarkdown>
											{detail.full_biography}
										</ReactMarkdown>
									</div>
								) : (
									<p className="saint-modal__empty">
										Aucune biographie disponible pour le
										moment.
									</p>
								)}
							</>
						)}
					</motion.div>

					<motion.section
						className="saint-modal__aside-grid"
						variants={rise}
					>
						<TagList
							title="Patronages"
							items={detail?.patronages}
						/>
						<TagList title="Attributs" items={detail?.attributes} />
					</motion.section>

					<motion.section
						className="saint-modal__explore"
						variants={rise}
					>
						<h3 className="saint-modal__eyebrow-title">Explorer</h3>
						<div className="saint-modal__explore-grid">
							<button
								type="button"
								className="explore-tile"
								disabled
							>
								<span
									className="explore-tile__icon"
									aria-hidden="true"
								>
									◍
								</span>
								<span className="explore-tile__body">
									<span className="explore-tile__title">
										Carte
									</span>
									<span className="explore-tile__desc">
										Lieux de naissance, de mort et
										d'activité
									</span>
								</span>
								<span className="explore-tile__soon">
									Bientôt
								</span>
							</button>
							<button
								type="button"
								className="explore-tile"
								disabled
							>
								<span
									className="explore-tile__icon"
									aria-hidden="true"
								>
									▣
								</span>
								<span className="explore-tile__body">
									<span className="explore-tile__title">
										Galerie
									</span>
									<span className="explore-tile__desc">
										Peintures et œuvres connues
									</span>
								</span>
								<span className="explore-tile__soon">
									Bientôt
								</span>
							</button>
						</div>
					</motion.section>
				</motion.div>
			</motion.div>
		</>,
		document.body,
	);
}
