import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRANSITIONS } from "../../styles/theme";
import { useState, useEffect } from "react";
import "./Header.css";
import { BurgerIcon } from "../BurgerIcon/BurgerIcon";
import { useWindowWidth } from "../../hooks/useWindowWidth";

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const windowWidth = useWindowWidth();

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
			<motion.div
				className={`header-gap-mask`}
				initial={{ height: "var(--initial-blur-height)" }}
				animate={{
					height: isScrolled
						? "var(--header-height)"
						: "var(--initial-blur-height)",
				}}
				transition={TRANSITIONS.normal}
			/>
			<motion.header
				className={`header ${isMenuOpen ? "open" : ""}`}
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
					width: isScrolled
						? "100vw"
						: windowWidth > 1600
							? "1440px"
							: "90%",
					borderRadius: isScrolled ? 0 : "1rem",
					height: isMenuOpen ? "var(--header-open-height)" : "",
					top: isScrolled ? 0 : "1rem",
					marginTop: isScrolled ? 0 : "1rem",
					backgroundColor: isScrolled
						? //Couleur mise au pif mais j'aime bien : a retenir !!
							// "rgba(34, 42, 63, 0.6)"
							"var(--color-primary-light)"
						: isMenuOpen
							? "var(--color-primary-light)"
							: "rgba(34, 42, 63, 0)",
				}}
				transition={TRANSITIONS.normal}
			>
				<motion.div
					className="header__main"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={TRANSITIONS.slower}
				>
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
				</motion.div>
				<motion.nav
					className={`header-nav__burger`}
					initial={{
						height: 0,
						opacity: 0,
						pointerEvents: "none",
					}}
					animate={{
						height: isMenuOpen ? "" : 0,
						opacity: isMenuOpen ? 1 : 0,
						pointerEvents: isMenuOpen ? "" : "none",
					}}
					transition={TRANSITIONS.normal}
				>
					<div className="header-nav__burger-inner">
						<motion.div
							className="header-nav__burger-column"
							initial={{ y: -50, opacity: 0 }}
							animate={{
								y: isMenuOpen ? 0 : -50,
								opacity: isMenuOpen ? 1 : 0,
							}}
							transition={
								isMenuOpen
									? TRANSITIONS.slower
									: { duration: 0 }
							}
						>
							<h3>Main</h3>
							<ul>
								<li>
									<Link
										to="/"
										onClick={() => setIsMenuOpen(false)}
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										to="/saint-of-the-day"
										onClick={() => setIsMenuOpen(false)}
									>
										Feast of the Day
									</Link>
								</li>
							</ul>
						</motion.div>
						<motion.div
							className="header-nav__burger-column"
							initial={{ y: -50, opacity: 0 }}
							animate={{
								opacity: isMenuOpen ? 1 : 0,
								y: isMenuOpen ? 0 : -50,
							}}
							transition={
								isMenuOpen
									? { ...TRANSITIONS.slower, delay: 0.1 }
									: { duration: 0 }
							}
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
							initial={{ opacity: 0, y: -50 }}
							animate={{
								opacity: isMenuOpen ? 1 : 0,
								y: isMenuOpen ? 0 : -50,
							}}
							transition={
								isMenuOpen
									? { ...TRANSITIONS.slower, delay: 0.2 }
									: {
											duration: 0,
										}
							}
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
					</div>
				</motion.nav>
			</motion.header>
		</>
	);
};

export { Header };
