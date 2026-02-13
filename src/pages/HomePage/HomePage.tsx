import { Logo } from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import "./HomePage.css";

const HomePage = () => {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={TRANSITIONS.slower}
			className="presentation"
		>
			<Logo color="var(--color-primary)" maxWidth={300} />
			<h1>Welcome to Saints-App</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magnam aliquam
				quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore
				dolemus, fieri tamen permagna accessio potest, si aliquod
				aeternum et infinitum impendere malum nobis opinemur. Quod idem
				licet transferre in voluptatem, ut postea variari voluptas
				distinguique possit, augeri amplificarique.
			</p>
			<nav className="home-nav">
				<Link
					to="/saint-of-the-day"
					className="home-nav-link saint-of-the-day-link"
				>
					Saint of the Day
				</Link>
				<Link to="/about" className="home-nav-link">
					About
				</Link>
			</nav>
		</motion.div>
	);
};

export { HomePage };
