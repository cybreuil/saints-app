import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const BodyClassController = () => {
	const location = useLocation();

	useEffect(() => {
		// Supprime toutes les classes connues
		document.body.classList.remove(
			"page-home",
			"saintoftheday",
			"aboutpage",
			"saintslist",
		);

		let cls = "";
		if (location.pathname === "/") cls = "page-home";
		else if (location.pathname.startsWith("/saint-of-the-day"))
			cls = "saintoftheday";
		else if (location.pathname === "/about") cls = "aboutpage";
		else if (location.pathname === "/saints") cls = "saintslist";

		if (cls) document.body.classList.add(cls);

		return () => {
			if (cls) document.body.classList.remove(cls);
		};
	}, [location.pathname]);

	return null;
};

export { BodyClassController };
