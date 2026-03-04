// import saintsData from "../../data/saints.json";
import { useMemo, useState } from "react";
import "./SaintsPage.css";
import { mockSaints } from "../../mocks/saints.mock.ts";
import { SaintCardSmall } from "../../components/SaintCardSmall/SaintCardSmall.tsx";
import { SaintModal } from "../../components/SaintModal/SaintModal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme.ts";
import { Pagination } from "../../components/Pagination/Pagination.tsx";

type SortKey = "name_asc" | "name_desc" | "feast_asc" | "feast_desc";
type CenturyFilter = "all" | "unknown" | string;

export function SaintsPage() {
	const [page, setPage] = useState(1);
	const saintsPerPage = 12; // 3 colonnes x 4 lignes = 12 saints par page -- par defaut

	// const paginatedSaints = mockSaints.slice(
	// 	(page - 1) * saintsPerPage,
	// 	page * saintsPerPage,
	// );
	// const totalPages = Math.ceil(mockSaints.length / saintsPerPage);

	const [selectedSaint, setSelectedSaint] = useState(null);

	// Gestion des filtres et tri
	const [query, setQuery] = useState("");
	const [century, setCentury] = useState<CenturyFilter>("all");
	const [sortKey, setSortKey] = useState<SortKey>("name_asc");

	const centuries = useMemo(() => {
		const set = new Set<string>();
		mockSaints.forEach((saint) => {
			if (saint.century) {
				set.add(saint.century);
			} else {
				set.add("unknown");
			}
		});
		return Array.from(set).sort();
	}, []);

	const filteredAndSorted = useMemo(() => {
		let list = [...mockSaints];

		// recherche nom
		if (query.trim()) {
			const q = query.trim().toLowerCase();
			list = list.filter((s) => s.name?.toLowerCase().includes(q));
		}

		// filtre siècle
		if (century !== "all") {
			if (century === "unknown") {
				list = list.filter((s) => !(s as any).century);
			} else {
				list = list.filter(
					(s) => String((s as any).century) === century,
				);
			}
		}

		// tri
		list.sort((a, b) => {
			switch (sortKey) {
				case "name_asc":
					return a.name.localeCompare(b.name, "fr");
				case "name_desc":
					return b.name.localeCompare(a.name, "fr");
				case "feast_asc":
					return (a.feastDay || "").localeCompare(
						b.feastDay || "",
						"fr",
					);
				case "feast_desc":
					return (b.feastDay || "").localeCompare(
						a.feastDay || "",
						"fr",
					);
				default:
					return 0;
			}
		});

		return list;
	}, [query, century, sortKey]);

	const totalPages = Math.ceil(filteredAndSorted.length / saintsPerPage);
	const paginatedSaints = filteredAndSorted.slice(
		(page - 1) * saintsPerPage,
		page * saintsPerPage,
	);

	// reset page si les filtres réduisent la liste
	const safePage = Math.min(page, totalPages);

	return (
		<motion.div
			className="saints-page"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={TRANSITIONS.slower}
		>
			<h2>Liste des Saints</h2>
			<p className="saints-count">{mockSaints.length} saints trouvés</p>
			<p className="saints-filters">
				Filtres et options de tri (à implémenter)
			</p>
			<p className="pagination-info">
				Page {page} sur {totalPages}
			</p>
			<form
				className="saints-filters"
				onSubmit={(e) => e.preventDefault()}
				aria-label="Filtres des saints"
			>
				<div className="filter-group">
					<label htmlFor="saint-query">Recherche</label>
					<input
						id="saint-query"
						type="search"
						placeholder="Nom du saint..."
						value={query}
						onChange={(e) => {
							setPage(1);
							setQuery(e.target.value);
						}}
					/>
				</div>

				<div className="filter-group">
					<label htmlFor="saint-century">Siècle</label>
					<select
						id="saint-century"
						value={century}
						onChange={(e) => {
							setPage(1);
							setCentury(e.target.value);
						}}
					>
						<option value="all">Tous les siècles</option>
						<option value="unknown">Inconnu</option>
						{centuries.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>

				<div className="filter-group">
					<label htmlFor="saint-sort">Trier par</label>
					<select
						id="saint-sort"
						value={sortKey}
						onChange={(e) => {
							setPage(1);
							setSortKey(e.target.value as SortKey);
						}}
					>
						<option value="name_asc">Nom (A → Z)</option>
						<option value="name_desc">Nom (Z → A)</option>
						<option value="feast_asc">Fête (croissant)</option>
						<option value="feast_desc">Fête (décroissant)</option>
					</select>
				</div>
			</form>
			{/* Filtres et options de tri ici */}

			<div className="saints-page__grid">
				{paginatedSaints.map((saint, index) => (
					<SaintCardSmall
						key={saint.id}
						saint={saint}
						onClick={() => setSelectedSaint(saint)}
						index={index}
					/>
					// </motion.div>
				))}
			</div>
			<AnimatePresence>
				{selectedSaint && (
					<SaintModal
						saint={selectedSaint}
						onClose={() => setSelectedSaint(null)}
					/>
				)}
			</AnimatePresence>
			{/* Pagination controls */}
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={setPage}
			/>
		</motion.div>
	);
}
