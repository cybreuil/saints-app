import saintsData from "../../data/saints.json";
import { useState } from "react";
import "./SaintsPage.css";
import { mockSaints } from "../../mocks/saints.mock.ts";
import { SaintCardSmall } from "../../components/SaintCardSmall/SaintCardSmall.tsx";
import { SaintModal } from "../../components/SaintModal/SaintModal.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme.ts";

export function SaintsPage() {
	const [page, setPage] = useState(1);
	const saintsPerPage = 20;
	const paginatedSaints = mockSaints.slice(
		(page - 1) * saintsPerPage,
		page * saintsPerPage,
	);

	const [selectedSaint, setSelectedSaint] = useState(null);

	return (
		<div className="saints-page">
			<h2>Liste des Saints</h2>
			{/* Filtres et options de tri ici */}

			<div className="saints-page__grid">
				{paginatedSaints.map((saint) => (
					<SaintCardSmall
						key={saint.id}
						saint={saint}
						onClick={() => setSelectedSaint(saint)}
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
		</div>
	);
}
