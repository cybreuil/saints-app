import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import { useState, useEffect } from "react";
import "./Header.css";
import { BurgerIcon } from "../BurgerIcon/BurgerIcon";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// On ecoute le scroll pour ajouter une classe "scrolled" au header lorsque l'utilisateur a scrollé de plus de 50px
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// On ferme le menu burger si l'utilisateur scrollle
	useEffect(() => {
		if (isScrolled) {
			setIsMenuOpen(false);
		}
	}, [isScrolled]);

	return (
		<motion.header
			className="header"
			initial={{
				y: -50,
				opacity: 0,
				width: "90%",
				borderRadius: "1rem",
				top: "1rem",
			}}
			animate={{
				y: 0,
				opacity: 1,
				width: isScrolled ? "100%" : "90%",
				borderRadius: isScrolled ? 0 : "1rem",
				top: isScrolled ? 0 : "1rem",
				height: isMenuOpen ? "300px" : "",
			}}
			transition={TRANSITIONS.normal}
		>
			<div className="header__main">
				<Logo />
				<h1 className="header-title">Saints-App</h1>
				{isScrolled ? (
					<nav className="header-nav">
						<Link to="/">Home</Link>
						<Link to="/saint-of-the-day">Feast of the Day</Link>
						<Link to="/saints">Saints List</Link>
						<Link to="/search">Search</Link>
						<Link to="/about">About</Link>
					</nav>
				) : (
					<BurgerIcon
						isOpen={isMenuOpen}
						onClick={() => setIsMenuOpen((prev) => !prev)}
					/>
				)}
			</div>
			{isMenuOpen && (
				<motion.nav
					className="header-nav__burger"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="header-nav__burger-column">
						<Link to="/" onClick={() => setIsMenuOpen(false)}>
							Home
						</Link>
						<Link
							to="/saint-of-the-day"
							onClick={() => setIsMenuOpen(false)}
						>
							Feast of the Day
						</Link>
					</div>
					<div className="header-nav__burger-column">
						<h3>Saints</h3>
						<ul>
							<li>
								<Link
									to="/saints"
									onClick={() => setIsMenuOpen(false)}
								>
									Saints List
								</Link>
							</li>
							<li>
								<Link
									to="/search"
									onClick={() => setIsMenuOpen(false)}
								>
									Search
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									onClick={() => setIsMenuOpen(false)}
								>
									About
								</Link>
							</li>
						</ul>
					</div>
					<div className="header-nav__burger-column">
						<h3>Contact</h3>
						{/*Mail / github */}
						<ul>
							<li>
								<Link
									to="https://github.com/cybreuil"
									target="_blank"
									rel="noopener noreferrer"
								>
									Github
								</Link>
							</li>
							<li>
								<Link
									to="mailto:cybreuil@gmail.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</motion.nav>
			)}
		</motion.header>
	);
};

export { Header };
