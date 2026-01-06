import { Logo } from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { motion } from "framer-motion";

const HomePage = () => {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="presentation"
		>
			<Logo color="var(--color-primary)" maxWidth={300} />
			<h1>Welcome to Saints-App</h1>
			<p>React App for catholic saints information.</p>
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
