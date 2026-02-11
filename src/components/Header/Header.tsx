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
		<>
			<div
				className={`header-gap-mask ${isScrolled ? "scrolled" : ""}`}
			/>
			<motion.header
				className="header"
				initial={{
					y: -50,
					opacity: 0,
					width: "90%",
					borderRadius: "1rem",
					top: "1rem",
					marginTop: "1rem",
				}}
				animate={{
					y: 0,
					opacity: 1,
					width: isScrolled ? "100%" : "90%",
					borderRadius: isScrolled ? 0 : "1rem",
					height: isMenuOpen ? "300px" : "",
					top: isScrolled ? 0 : "1rem",
					marginTop: isScrolled ? 0 : "1rem",
				}}
				transition={TRANSITIONS.normal}
			>
				<div className="header__main" transition={TRANSITIONS.normal}>
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
				<motion.nav
					className="header-nav__burger"
					animate={{
						opacity: isMenuOpen ? 1 : 0,
						pointerEvents: isMenuOpen ? "" : "none",
						height: isMenuOpen ? "" : 0,
					}}
					transition={TRANSITIONS.normal}
				>
					<motion.div
						className="header-nav__burger-column"
						animate={{
							x: isMenuOpen ? 0 : -50,
							scale: isMenuOpen ? 1 : 0.8,
						}}
						transition={TRANSITIONS.normal}
					>
						<Link to="/" onClick={() => setIsMenuOpen(false)}>
							Home
						</Link>
						<Link
							to="/saint-of-the-day"
							onClick={() => setIsMenuOpen(false)}
						>
							Feast of the Day
						</Link>
					</motion.div>
					<motion.div
						className="header-nav__burger-column"
						animate={{
							scale: isMenuOpen ? 1 : 0.8,
						}}
						transition={TRANSITIONS.normal}
					>
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
					</motion.div>
					<motion.div
						className="header-nav__burger-column"
						animate={{
							x: isMenuOpen ? 0 : 50,
							scale: isMenuOpen ? 1 : 0.8,
						}}
						transition={TRANSITIONS.normal}
					>
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
					</motion.div>
				</motion.nav>
			</motion.header>
		</>
	);
};

export { Header };
