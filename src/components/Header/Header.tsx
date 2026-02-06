import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	// On ecoute le scroll pour ajouter une classe "scrolled" au header lorsque l'utilisateur a scrollé de plus de 50px
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className="header"
			initial={{ y: -50, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				width: isScrolled ? "100%" : "90%",
				marginTop: isScrolled ? 0 : "1rem",
				borderRadius: isScrolled ? 0 : "1rem",
				top: isScrolled ? 0 : "1rem",
			}}
			transition={TRANSITIONS.normal}
		>
			<Logo />
			<h1 className="header-title">Saints-App</h1>
			<nav className="header-nav">
				<Link to="/">Home</Link>
				<Link to="/saint-of-the-day">Feast of the Day</Link>
				<Link to="/saints">Saints List</Link>
				<Link to="/search">Search</Link>
				<Link to="/about">About</Link>
			</nav>
		</motion.header>
	);
};

export { Header };
