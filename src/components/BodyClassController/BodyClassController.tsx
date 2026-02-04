import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const routeToClass = {
	"/": "page-home",
	"/saint-of-the-day": "saintoftheday",
	"/about": "aboutpage",
	"/saints": "saintslist",
	// Routes a ajouter ici
};

const BodyClassController = () => {
	const location = useLocation();

	useEffect(() => {
		const cls = routeToClass[location.pathname] || "";

		// Supprime toutes les classes connues
		Object.values(routeToClass).forEach((c) =>
			document.body.classList.remove(c),
		);

		// Ajoute la classe courante
		if (cls) document.body.classList.add(cls);

		// Nettoyage optionnel à l'unmount
		return () => {
			if (cls) document.body.classList.remove(cls);
		};
	}, [location.pathname]);

	return null;
};

export { BodyClassController };
