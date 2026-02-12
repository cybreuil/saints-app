import { motion } from "framer-motion";
import { useIsBottom } from "../../hooks/useIsBottom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { TRANSITIONS } from "../../styles/theme";
import "./Footer.css";

const Footer = () => {
	const isBottom = useIsBottom(10);
	const windowWidth = useWindowWidth();
	return (
		<motion.footer
			className="footer"
			initial={{
				y: 50,
				opacity: 0,
				width: "90%",
				borderRadius: "1rem",
				marginBottom: "1rem",
			}}
			animate={{
				y: 0,
				opacity: 1,
				width: windowWidth > 1600 ? "1440px" : "90%",
				borderRadius: isBottom ? 0 : "1rem",
			}}
			transition={TRANSITIONS.normal}
		>
			<p>
				© {new Date().getFullYear()} Saints-App. All rights reserved.
			</p>
			<p className="footer-credit">
				<a
					href="github.com/cybreuil"
					target="_blank"
					rel="noopener noreferrer"
				>
					Github
				</a>
			</p>
		</motion.footer>
	);
};

export { Footer };
