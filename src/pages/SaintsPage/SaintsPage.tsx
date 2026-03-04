// import saintsData from "../../data/saints.json";
import { useMemo, useState } from "react";
import "./SaintsPage.css";
import { mockSaints } from "../../mocks/saints.mock.ts";
import { SaintCardSmall } from "../../components/SaintCardSmall/SaintCardSmall.tsx";
import { SaintModal } from "../../components/SaintModal/SaintModal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme.ts";
import { Pagination } from "../../components/Pagination/Pagination.tsx";
import { SaintsFilters } from "../../components/SaintsFilters/SaintsFilters.tsx";

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

			{/* Filtres et options de tri ici */}
			<SaintsFilters
				query={query}
				onQueryChange={(v) => {
					setPage(1);
					setQuery(v);
				}}
				century={century}
				onCenturyChange={(v) => {
					setPage(1);
					setCentury(v);
				}}
				sortKey={sortKey}
				onSortByChange={(v) => {
					setPage(1);
					setSortKey(v);
				}}
				centuries={centuries}
			/>

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
