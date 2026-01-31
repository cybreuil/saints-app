import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import "./Header.css";

const Header = () => {
	return (
		<motion.header
			className="header"
			initial={{ y: -50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={TRANSITIONS.normal}
		>
			<Logo />
			<h1 className="header-title">Saints-App</h1>
			<nav className="header-nav">
				<Link to="/">Home</Link>
				<Link to="/saint-of-the-day">Saint of the Day</Link>
			</nav>
		</motion.header>
	);
};

export { Header };
