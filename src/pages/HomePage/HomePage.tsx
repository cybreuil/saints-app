import "./HomePage.css";
import { RippleLink } from "../../components/RippleLink/RippleLink";
import { ArtworkHero } from "../../components/ArtworkHero/ArtworkHero";
import { motion } from "framer-motion";

/* Reveal helpers: fade + slight rise when the section enters the viewport */
const sectionReveal = {
	hidden: { opacity: 0, y: 32 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
	},
};

const staggerGroup = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12 } },
};

const FEATURES = [
	{
		title: "La célébration du jour",
		text: "Chaque jour, découvrez la fête liturgique célébrée : son rang, sa couleur, son histoire. Un calendrier vivant, consultable jour après jour.",
		link: "/celebration",
		linkLabel: "Voir aujourd'hui",
		accent: "─ Calendrier liturgique",
	},
	{
		title: "Plusieurs calendriers",
		text: "Calendriers nationaux ou calendrier traditionnel antérieur à 1962 : comparez les usages et suivez celui qui correspond à votre pratique.",
		link: "/celebration",
		linkLabel: "Choisir un calendrier",
		accent: "─ Traditions & usages",
	},
	{
		title: "Les vies des saints",
		text: "Des centaines de saints, leurs histoires et les chefs-d'œuvre qu'ils ont inspirés — peintures célèbres, pour la plupart dans le domaine public.",
		link: "/saints",
		linkLabel: "Parcourir la galerie",
		accent: "─ Art & mémoire",
	},
];

const HomePage = () => {
	return (
		<div className="home-page">
			<ArtworkHero
				eyebrow="Saints, célébrations et œuvres"
				title="Genuflexio"
				description="Explorez les vies, les histoires et les œuvres consacrées aux saints à travers les siècles."
			>
				<RippleLink
					to="/celebration"
					className="artwork-hero__action artwork-hero__action--primary"
					rippleColor="rgba(0, 0, 0, 0.15)"
				>
					Célébration du jour
				</RippleLink>
				<RippleLink to="/saints" className="artwork-hero__action">
					Découvrir les saints
				</RippleLink>
			</ArtworkHero>

			{/* ===== Intro éditoriale ===== */}
			<motion.section
				className="home-intro"
				variants={sectionReveal}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.4 }}
			>
				<span className="home-intro__eyebrow">Le projet</span>
				<h2 className="home-intro__title">
					Un jour, une célébration.
					<br />
					Un saint, mille histoires.
				</h2>
				<p className="home-intro__text">
					Genuflexio réunit le calendrier liturgique et le patrimoine
					artistique qu'il a inspiré. Consultez la fête du jour selon
					votre calendrier, remontez le fil des siècles à travers les
					vies des saints, et contemplez les œuvres — souvent des
					peintures majeures — qui leur sont consacrées.
				</p>
			</motion.section>

			{/* ===== Fonctionnalités ===== */}
			<motion.section
				className="home-features"
				variants={staggerGroup}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.25 }}
			>
				{FEATURES.map((feature) => (
					<motion.article
						key={feature.title}
						className="home-feature"
						variants={sectionReveal}
					>
						<span className="home-feature__accent">
							{feature.accent}
						</span>
						<h3 className="home-feature__title">{feature.title}</h3>
						<p className="home-feature__text">{feature.text}</p>
						<RippleLink
							to={feature.link}
							className="home-feature__link"
						>
							{feature.linkLabel} →
						</RippleLink>
					</motion.article>
				))}
			</motion.section>

			{/* ===== CTA final ===== */}
			<motion.section
				className="home-cta"
				variants={sectionReveal}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.5 }}
			>
				<h2 className="home-cta__title">
					Quelle fête célèbre-t-on aujourd'hui ?
				</h2>
				<RippleLink
					to="/celebration"
					className="home-cta__button"
					rippleColor="rgba(0, 0, 0, 0.15)"
				>
					Découvrir la célébration du jour
				</RippleLink>
			</motion.section>
		</div>
	);
};

export { HomePage };
