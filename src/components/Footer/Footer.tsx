import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import "./Footer.css";

const Footer = () => {
	return (
		<motion.footer
			className="footer"
			initial={{ y: 50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
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
