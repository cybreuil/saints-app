import React, { useState, useMemo } from "react";
import saintsData from "../../data/saints.json";
import "./SearchPage.css";

type Saint = {
	id: string;
	name: string;
	feastDay: string;
	description: string;
	image?: string;
};

function flattenSaints(data: typeof saintsData): Saint[] {
	// Prend le premier calendrier trouvé
	const calendar = Object.values(data.calendars)[0];
	const saints: Saint[] = [];
	Object.values(calendar.saints).forEach((saintsArr: any) => {
		saintsArr.forEach((saint: any) => {
			saints.push(saint);
		});
	});
	return saints;
}

export const SearchPage: React.FC = () => {
	const allSaints = useMemo(() => flattenSaints(saintsData), []);
	const [query, setQuery] = useState("");

	const filteredSaints = useMemo(() => {
		return allSaints.filter(
			(saint) =>
				saint.name.toLowerCase().includes(query.toLowerCase()) ||
				saint.description.toLowerCase().includes(query.toLowerCase()),
		);
	}, [allSaints, query]);

	return (
		<div className="search-page-container">
			<h1>Recherche de saints</h1>
			<input
				type="text"
				placeholder="Rechercher un saint..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="search-input"
			/>
			<div className="saints-grid">
				{filteredSaints.map((saint) => (
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
		</div>
	);
};
