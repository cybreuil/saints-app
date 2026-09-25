import "./GalleryPage.css";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getImages } from "../../api/images";
import type { Image } from "../../types/Image";
import { Loader } from "../../components/Loader/Loader";
import {
	GalleryFilters,
	DEFAULT_GALLERY_FILTERS,
	type GalleryFiltersValue,
} from "../../components/GalleryFilters/GalleryFilters";
import { ArtworkLightbox } from "../../components/ArtworkLightbox/ArtworkLightbox";
import {
	buildFacet,
	cartel,
	periodLabel,
	periodOf,
} from "../../utils/artworkFormat";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const wallGroup = {
	hidden: {},
	show: { transition: { staggerChildren: 0.035 } },
};

const tile = {
	hidden: { opacity: 0, y: 30, scale: 0.97 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.6, ease: EASE },
	},
};

/** Mélange déterministe par seed pour un "accrochage libre" stable pendant la session */
function seededShuffle<T>(arr: T[], seed: number): T[] {
	const a = [...arr];
	let s = seed;
	for (let i = a.length - 1; i > 0; i--) {
		s = (s * 9301 + 49297) % 233280;
		const j = Math.floor((s / 233280) * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function normalize(s: string) {
	return s
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

const GalleryPage = () => {
	const [images, setImages] = useState<Image[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [filters, setFilters] = useState<GalleryFiltersValue>(
		DEFAULT_GALLERY_FILTERS,
	);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [seed] = useState(() => Math.floor(Math.random() * 100000));

	useEffect(() => {
		let cancelled = false;
		getImages()
			.then((data) => !cancelled && setImages(data.data))
			.catch(
				(e) =>
					!cancelled &&
					setError(e instanceof Error ? e : new Error(String(e))),
			)
			.finally(() => !cancelled && setLoading(false));
		return () => {
			cancelled = true;
		};
	}, []);

	const facets = useMemo(
		() => ({
			saint: buildFacet(images, (i) => i.saint_name),
			artist: buildFacet(images, (i) => i.creator),
			period: buildFacet(images, periodOf, periodLabel).sort(
				(a, b) => Number(a.value) - Number(b.value),
			),
			museum: buildFacet(images, (i) => i.repository),
		}),
		[images],
	);

	const results = useMemo(() => {
		const q = normalize(filters.query.trim());
		let list = images.filter((img) => {
			if (filters.artist && img.creator !== filters.artist) return false;
			if (filters.museum && img.repository !== filters.museum)
				return false;
			if (filters.saint && img.saint_name !== filters.saint) return false;
			if (filters.period && periodOf(img) !== filters.period)
				return false;
			if (q) {
				const hay = normalize(
					[
						img.title,
						img.creator,
						img.saint_name,
						img.repository,
						img.date_label,
					]
						.filter(Boolean)
						.join(" "),
				);
				if (!hay.includes(q)) return false;
			}
			return true;
		});

		const year = (i: Image) =>
			i.year ?? Number(i.date_label?.match(/\d{3,4}/)?.[0] ?? NaN);
		switch (filters.sort) {
			case "title":
				list = [...list].sort((a, b) =>
					a.title.localeCompare(b.title, "fr"),
				);
				break;
			case "artist":
				list = [...list].sort((a, b) =>
					(a.creator ?? "zzz").localeCompare(
						b.creator ?? "zzz",
						"fr",
					),
				);
				break;
			case "period_asc":
				list = [...list].sort(
					(a, b) => (year(a) || 9999) - (year(b) || 9999),
				);
				break;
			case "period_desc":
				list = [...list].sort(
					(a, b) => (year(b) || 0) - (year(a) || 0),
				);
				break;
			default:
				list = seededShuffle(list, seed);
		}
		return list;
	}, [images, filters, seed]);

	// Clé pour relancer l'animation du mur quand le résultat change
	const wallKey = useMemo(
		() => JSON.stringify({ ...filters, n: results.length }),
		[filters, results.length],
	);

	return (
		<div className="gallery-page">
			<motion.header
				className="gallery-header"
				variants={reveal}
				initial="hidden"
				animate="show"
			>
				<span className="gallery-header__eyebrow">─ Galerie</span>
				<h1 className="gallery-header__title">
					Les saints vus par les peintres
				</h1>
				<p className="gallery-header__text">
					Un mur d'œuvres, du domaine public, à parcourir librement.
					Filtrez par saint, artiste, période ou musée — puis entrez
					dans la salle.
				</p>
			</motion.header>

			<motion.div
				className="gallery-page__filters"
				variants={reveal}
				initial="hidden"
				animate="show"
				transition={{ delay: 0.1 }}
			>
				<GalleryFilters
					value={filters}
					onChange={setFilters}
					facets={facets}
					resultCount={results.length}
					totalCount={images.length}
				/>
			</motion.div>

			<AnimatePresence mode="wait">
				{loading ? (
					<motion.div
						key="loading"
						className="gallery-state"
						exit={{ opacity: 0 }}
					>
						<Loader size={56} />
					</motion.div>
				) : error ? (
					<motion.div
						key="error"
						className="gallery-state gallery-state--error"
					>
						Impossible de charger la galerie.
						<span className="gallery-state__detail">
							{error.message}
						</span>
					</motion.div>
				) : results.length === 0 ? (
					<motion.div
						key="empty"
						className="gallery-state"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						Aucune œuvre ne correspond à ces filtres.
					</motion.div>
				) : (
					<motion.ul
						key={wallKey}
						className="gallery-wall"
						variants={wallGroup}
						initial="hidden"
						animate="show"
						exit={{ opacity: 0, transition: { duration: 0.2 } }}
					>
						{results.map((img, i) => {
							const ratio =
								img.width && img.height
									? img.width / img.height
									: undefined;
							return (
								<motion.li
									key={img.id}
									className="gallery-tile"
									variants={tile}
									style={
										ratio
											? { aspectRatio: String(ratio) }
											: undefined
									}
								>
									<button
										type="button"
										className="gallery-tile__button"
										onClick={() => setOpenIndex(i)}
										aria-label={`${img.title}${img.creator ? `, ${img.creator}` : ""}`}
									>
										<img
											src={img.image_url}
											alt=""
											loading={i < 6 ? "eager" : "lazy"}
											decoding="async"
											draggable={false}
										/>
										<span
											className="gallery-tile__frame"
											aria-hidden="true"
										/>
										<span className="gallery-tile__cartel">
											{img.saint_name && (
												<span className="gallery-tile__saint">
													{img.saint_name}
												</span>
											)}
											<span className="gallery-tile__title">
												{img.title}
											</span>
											{cartel(img) && (
												<span className="gallery-tile__meta">
													{cartel(img)}
												</span>
											)}
										</span>
									</button>
								</motion.li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{openIndex !== null && results[openIndex] && (
					<ArtworkLightbox
						items={results}
						index={openIndex}
						onIndexChange={setOpenIndex}
						onClose={() => setOpenIndex(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export { GalleryPage };
