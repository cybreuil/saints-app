import { useEffect, useState } from "react";
import { motion, scale } from "framer-motion";
import "./ScrollToTop.css";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Fonction pour remonter en haut de page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Gestion des événements de défilement
	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<motion.button
			className="scroll-button"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
			transition={{
				opacity: { duration: 0.3 },
				y: { duration: 0.3 },
				scale: { duration: 0.1 },
			}}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			style={{ pointerEvents: isVisible ? "auto" : "none" }}
			onClick={scrollToTop}
			aria-label="Retour en haut de page"
		>
			<div className="chevron-up"></div>
		</motion.button>
	);
};

export { ScrollToTop };
