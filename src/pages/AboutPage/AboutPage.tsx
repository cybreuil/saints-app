import "./AboutPage.css";
import { useLanguage } from "../../hooks/useLanguage";
import { motion } from "framer-motion";

// Animation preset
const EASE = [0.22, 1, 0.36, 1] as const;

const headerReveal = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const AboutPage = () => {
	const { t } = useLanguage();

	return (
		<div className="about-page">
			<motion.header
				className="about-page__header"
				variants={headerReveal}
				initial="hidden"
				animate="show"
			>
				<span className="about-page__header__eyebrow">
					{t("about.eyebrow")}
				</span>
				<h1 className="about-page__header__title">
					{t("about.title")}
				</h1>
				<p className="about-page__header__text">{t("about.text")}</p>
			</motion.header>
			<div className="about-page__info">
				<p>
					Saints-App is dedicated to providing users with daily
					information about saints from various traditions. Our
					mission is to educate and inspire individuals by sharing the
					stories and legacies of these remarkable figures.
				</p>
				<p>
					This application was developed with love and care to ensure
					a user-friendly experience. We hope you find value in the
					content and enjoy exploring the lives of saints.
				</p>
				<p>
					For any questions or feedback, please feel free to reach out
					to us.
				</p>
			</div>
		</div>
	);
};

export { AboutPage };
