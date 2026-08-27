import { motion } from "framer-motion";
import { useIsBottom } from "../../hooks/useIsBottom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { TRANSITIONS } from "../../styles/theme";
import "./Footer.css";
import { useLanguage } from "../../hooks/useLanguage";

const Footer = () => {
	const {t} = useLanguage();
	const isBottom = useIsBottom(10);
	const windowWidth = useWindowWidth();


	return (
		<motion.footer
			className="footer"
			initial={{
				y: 50,
				opacity: 0,
				width: "90%",
			}}
			animate={{
				y: 0,
				opacity: 1,
				width: windowWidth > 1600 ? "1440px" : "90%",
			}}
			transition={TRANSITIONS.normal}
		>
			<motion.div
				className="footer__content"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={TRANSITIONS.slower}
			>
				<p>
					© {new Date().getFullYear()} Saints-App. {t("credits.copyright")}
				</p>
				<p className="footer-credit">
					<a
						href="https://github.com/cybreuil"
						target="_blank"
						rel="noopener noreferrer"
					>
						Github
					</a>
				</p>
			</motion.div>
		</motion.footer>
	);
};

export { Footer };
