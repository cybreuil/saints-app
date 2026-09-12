import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import "./ScrollToTop.css";

/** Same offset past which the header hides itself: the button takes over */
const SHOW_THRESHOLD = 500;

const ScrollToTop = () => {
	const { t } = useLanguage();
	const reduceMotion = useReducedMotion();
	const [isVisible, setIsVisible] = useState(false);

	// One check per frame at most, and no re-render when the value doesn't change
	useEffect(() => {
		let ticking = false;

		const update = () => {
			const next = window.scrollY > SHOW_THRESHOLD;
			setIsVisible((prev) => (prev === next ? prev : next));
			ticking = false;
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					type="button"
					className="scroll-top"
					onClick={scrollToTop}
					aria-label={t("nav.backToTop")}
					initial={{ opacity: 0, y: 16, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 16, scale: 0.9 }}
					transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
					whileHover={{ y: -2 }}
					whileTap={{ scale: 0.94 }}
				>
					<svg
						className="scroll-top__icon"
						viewBox="0 0 24 24"
						width="20"
						height="20"
						aria-hidden="true"
					>
						<path
							d="M6 14l6-6 6 6"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.75"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export { ScrollToTop };
