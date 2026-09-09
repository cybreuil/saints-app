import { motion } from "framer-motion";
// import { useIsBottom } from "../../hooks/useIsBottom";
import { TRANSITIONS } from "../../styles/theme";
import "./Footer.css";
import { useLanguage } from "../../hooks/useLanguage";
import { GithubLogo } from "../../icons";

const Footer = () => {
	const { t } = useLanguage();
	// const isBottom = useIsBottom(10);

	return (
		<motion.footer
			className="footer"
			initial={{
				y: 50,
				opacity: 0,
			}}
			animate={{
				y: 0,
				opacity: 1,
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
					© {new Date().getFullYear()} Saints-App.{" "}
					{t("credits.copyright")}
				</p>
				<p className="footer-credit">
					<a
						href="https://github.com/cybreuil"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GithubLogo fill="currentColor" />
						Github
					</a>
				</p>
			</motion.div>
		</motion.footer>
	);
};

export { Footer };
