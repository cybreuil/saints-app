import React from "react";

// Exemple de données statiques (à remplacer par une récupération dynamique si besoin)
const saintOfTheDay = {
	name: "Saint Antoine de Padoue",
	date: new Date().toLocaleDateString("fr-FR", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}),
	description:
		"Saint Antoine de Padoue, prêtre franciscain et docteur de l'Église, est le saint patron des objets perdus. Il est célébré pour sa prédication et sa profonde connaissance des Écritures.",
	image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Saint_Antoine_de_Padoue.jpg", // Remplace par une image locale si besoin
};

const SaintOfTheDay: React.FC = () => {
	return (
		<div
			style={{
				maxWidth: 500,
				margin: "2rem auto",
				padding: "2rem",
				borderRadius: "1rem",
				background: "#f9f9f9",
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
			}}
		>
			<h1 style={{ textAlign: "center", color: "#2d5c3b" }}>
				Saint du jour
			</h1>
			<h2 style={{ textAlign: "center" }}>{saintOfTheDay.name}</h2>
			<p
				style={{
					textAlign: "center",
					fontStyle: "italic",
					color: "#666",
				}}
			>
				{saintOfTheDay.date}
			</p>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<img
					src={saintOfTheDay.image}
					alt={saintOfTheDay.name}
					style={{
						width: 180,
						borderRadius: "0.5rem",
						margin: "1rem 0",
					}}
				/>
				<p style={{ textAlign: "justify" }}>
					{saintOfTheDay.description}
				</p>
			</div>
		</div>
	);
};

export { SaintOfTheDay };
