import { Logo } from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import "./HomePage.css";
// import { RippleButton } from "../../components/RippleButton/RippleButton";
import { RippleLink } from "../../components/RippleLink/RippleLink";
import { ArtworkHero } from "../../components/ArtworkHero/ArtworkHero";

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

			<section className="presentation">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magnam aliquam
				quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore
				dolemus, fieri tamen permagna accessio potest, si aliquod
				aeternum et infinitum impendere malum nobis opinemur. Quod idem
				licet transferre in voluptatem, ut.
			</section>
		</div>
	);
};

export { HomePage };
