// import saintsData from "../../data/saints.json";
import { useState } from "react";
import "./SaintsPage.css";
import { mockSaints } from "../../mocks/saints.mock.ts";
import { SaintCardSmall } from "../../components/SaintCardSmall/SaintCardSmall.tsx";
import { SaintModal } from "../../components/SaintModal/SaintModal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme.ts";
import { Pagination } from "../../components/Pagination/Pagination.tsx";

export function SaintsPage() {
	const [page, setPage] = useState(1);
	const saintsPerPage = 12; // 3 colonnes x 4 lignes = 12 saints par page -- par defaut
	const paginatedSaints = mockSaints.slice(
		(page - 1) * saintsPerPage,
		page * saintsPerPage,
	);
	const totalPages = Math.ceil(mockSaints.length / saintsPerPage);

	const [selectedSaint, setSelectedSaint] = useState(null);

	return (
		<motion.div
			className="saints-page"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={TRANSITIONS.slower}
		>
			<h2>Liste des Saints</h2>
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
			{/* Pagination controls ici */}
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={setPage}
			/>
		</motion.div>
	);
}
