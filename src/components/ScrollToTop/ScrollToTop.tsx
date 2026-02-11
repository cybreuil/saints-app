import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
		<motion.div
			className={`scroll-to-top`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
			transition={{ duration: 0.3 }}
			style={{ pointerEvents: isVisible ? "auto" : "none" }}
		>
			<button
				className="scroll-button"
				onClick={scrollToTop}
				aria-label="Retour en haut de page"
			>
				<div className="chevron-up"></div>
			</button>
		</motion.div>
	);
};

export { ScrollToTop };
