import saintsData from "../../data/saints.json";
import { useState } from "react";
// MOCK DE SAINTS POUR TESTER
const saints = [
	{
		id: "saint_pierre",
		name: "Saint Pierre",
		feastDay: "29 juin",
		description: "Premier pape, apôtre du Christ.",
		image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Saint_Peter_by_Peter_Paul_Rubens.jpg",
	},
	{
		id: "saint_paul",
		name: "Saint Paul",
		feastDay: "29 juin",
		description: "Apôtre des nations, grand missionnaire.",
		image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Saint_Paul_by_Rembrandt.jpg",
	},
	{
		id: "sainte_therese",
		name: "Sainte Thérèse de Lisieux",
		feastDay: "1er octobre",
		description: "Docteur de l'Église, patronne des missions.",
		image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Therese_de_Lisieux.jpg",
	},
	{
		id: "saint_francois",
		name: "Saint François d'Assise",
		feastDay: "4 octobre",
		description: "Fondateur des franciscains, ami des pauvres.",
		image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Saint_Francis_of_Assisi_by_Cimabue.jpg",
	},
	{
		id: "sainte_jeanne",
		name: "Sainte Jeanne d'Arc",
		feastDay: "30 mai",
		description: "Héroïne nationale, martyre.",
		image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Joan_of_Arc_miniature_graded.jpg",
	},
	// ... Ajoute autant de saints que tu veux pour tester la pagination
];

export function SaintsPage() {
	const [page, setPage] = useState(1);
	const saintsPerPage = 20;
	const paginatedSaints = saints.slice(
		(page - 1) * saintsPerPage,
		page * saintsPerPage,
	);

	return (
		<div>
			<div className="saints-grid">
				{paginatedSaints.map((saint) => (
					<div className="saint-card" key={saint.id}>
						<img
							src={saint.image || "/default.png"}
							alt={saint.name}
						/>
						<h3>{saint.name}</h3>
						<p>{saint.feastDay}</p>
					</div>
				))}
			</div>
			{/* Pagination controls ici */}
		</div>
	);
}
