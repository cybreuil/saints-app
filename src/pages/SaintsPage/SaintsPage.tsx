import "./SaintsPage.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SaintCardSmall } from "../../components/SaintCardSmall/SaintCardSmall.tsx";
import { SaintModal } from "../../components/SaintModal/SaintModal.tsx";
import { Pagination } from "../../components/Pagination/Pagination.tsx";
import { Loader } from "../../components/Loader/Loader.tsx";

import { useSaints } from "../../hooks/useSaints.ts";
import { useLanguage } from "../../hooks/useLanguage.ts";
import type { SaintApi } from "../../types/Saint.ts";

/* ===== Animation presets ===== */

const EASE = [0.22, 1, 0.36, 1] as const;

const headerReveal = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const gridGroup = {
	hidden: {},
	show: { transition: { staggerChildren: 0.06 } },
	exit: { opacity: 0, transition: { duration: 0.2 } },
};

const SAINTS_PER_PAGE = 12;

function StateBlock({
	tone = "neutral",
	children,
}: {
	tone?: "neutral" | "error";
	children: React.ReactNode;
}) {
	return (
		<motion.div
			className={`saints-state saints-state--${tone}`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			{children}
		</motion.div>
	);
}

export function SaintsPage() {
	const { getSaintList } = useSaints();
	const { languageCode } = useLanguage();

	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [selectedSaint, setSelectedSaint] = useState<SaintApi | null>(null);

	const [saintsList, setSaintsList] = useState<SaintApi[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		let cancelled = false;

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await getSaintList({
					page,
					perPage: SAINTS_PER_PAGE,
					languageCode,
				});
				if (cancelled) return;
				setSaintsList(response.data);
				setTotalCount(response.total);
				setTotalPages(response.total_pages);
			} catch (err) {
				if (cancelled) return;
				setError(
					err instanceof Error
						? err
						: new Error("Impossible de charger les saints."),
				);
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchData();
		return () => {
			cancelled = true;
		};
		// getSaintList n'est pas mémoïsé dans useSaints → boucle si mis en deps
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, languageCode]);

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		const reduceMotion = window.matchMedia?.(
			"(prefers-reduced-motion: reduce)",
		).matches;
		window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
	};

	return (
		<div className="saints-page">
			<motion.header
				className="saints-header"
				variants={headerReveal}
				initial="hidden"
				animate="show"
			>
				<span className="saints-header__eyebrow">─ Art & mémoire</span>
				<h1 className="saints-header__title">Les vies des saints</h1>
				<p className="saints-header__text">
					Des centaines de figures, leurs histoires et les
					chefs-d'œuvre qu'elles ont inspirés. Parcourez la galerie,
					siècle après siècle.
				</p>
				{totalCount > 0 && (
					<p className="saints-header__meta">
						{totalCount} saints · Page {page} / {totalPages}
					</p>
				)}
			</motion.header>

			{/* Toolbar : filtres à venir (recherche, siècle, tri) */}
			<div className="saints-toolbar">
				<div className="saints-toolbar__filters" />
				{totalCount > 0 && (
					<span className="saints-toolbar__count">
						{totalCount} saints
					</span>
				)}
			</div>

			<AnimatePresence mode="wait">
				{loading ? (
					<StateBlock key="loading">
						<Loader size={56} />
					</StateBlock>
				) : error ? (
					<StateBlock key="error" tone="error">
						Impossible de charger les saints.
						<span className="saints-state__detail">
							{error.message}
						</span>
					</StateBlock>
				) : saintsList.length === 0 ? (
					<StateBlock key="empty">Aucun saint à afficher.</StateBlock>
				) : (
					<motion.section
						key={page}
						className="saints-grid"
						variants={gridGroup}
						initial="hidden"
						animate="show"
						exit="exit"
						aria-label="Liste des saints"
					>
						{saintsList.map((saint, index) => (
							<SaintCardSmall
								key={saint.id}
								saint={saint}
								onClick={() => setSelectedSaint(saint)}
								index={index}
							/>
						))}
					</motion.section>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedSaint && (
					<SaintModal
						saint={selectedSaint}
						onClose={() => setSelectedSaint(null)}
					/>
				)}
			</AnimatePresence>

			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
