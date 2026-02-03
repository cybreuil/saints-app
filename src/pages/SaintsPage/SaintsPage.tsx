import saintsData from "../../data/saints.json";
import { useState } from "react";
import "./SaintsPage.css";
import { mockSaints } from "../../mocks/saints.mock.ts";
import { SaintCardSmall } from "../../components/SaintCardSmall/SaintCardSmall.tsx";

export function SaintsPage() {
	const [page, setPage] = useState(1);
	const saintsPerPage = 20;
	const paginatedSaints = mockSaints.slice(
		(page - 1) * saintsPerPage,
		page * saintsPerPage,
	);

	return (
		<div className="saints-page">
			<h2>Liste des Saints</h2>
			{/* Filtres et options de tri ici */}

			<div className="saints-page__grid">
				{paginatedSaints.map((saint) => (
					<SaintCardSmall key={saint.id} saint={saint} />
				))}
			</div>
			{/* Pagination controls ici */}
		</div>
	);
}
