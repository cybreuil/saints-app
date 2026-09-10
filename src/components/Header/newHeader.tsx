import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../Logo/Logo";
import { BurgerIcon } from "../BurgerIcon/BurgerIcon";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { LanguageDropDown } from "../LanguageDropDown/LanguageDropDown";
import { useLanguage } from "../../hooks/useLanguage";
import { EASINGS } from "../../styles/theme";
import "./Header.css";

type NavItem = { to: string; labelKey: string; end?: boolean };

const NAV_ITEMS: NavItem[] = [
	{ to: "/", labelKey: "nav.home", end: true },
	{ to: "/celebration", labelKey: "nav.celebration" },
	{ to: "/saints", labelKey: "nav.saints" },
	{ to: "/search", labelKey: "nav.search" },
	{ to: "/about", labelKey: "nav.about" },
];

/**
 * Past this offset the header becomes compact and translucent.
 * ArtworkHero hides its title at the same offset so the shared `website-title`
 * layout animation hands over cleanly — keep the two values in sync.
 */
const SCROLL_THRESHOLD = 50;
/** Below this offset the header is never hidden, so the top of the page stays reachable */
const HIDE_THRESHOLD = 240;
/** Scroll jitter smaller than this is ignored when deciding the direction */
const DIRECTION_DEADZONE = 6;

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const menuOverlay = {
	hidden: {
		opacity: 0,
		transition: { duration: 0.25, ease: EASINGS.standard },
	},
	show: { opacity: 1, transition: { duration: 0.3, ease: EASINGS.standard } },
};

const menuList = {
	hidden: {},
	show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const menuItem = {
	hidden: { opacity: 0, y: 24, transition: { duration: 0.15 } },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const menuFooter = {
	hidden: { opacity: 0, y: 16, transition: { duration: 0.15 } },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, delay: 0.45, ease: EASE_OUT },
	},
};

const Header = () => {
	const { t } = useLanguage();
	const { pathname } = useLocation();
	const isHome = pathname === "/";

	const [isScrolled, setIsScrolled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Compact past a threshold; hide while scrolling down, reveal on scroll up
	useEffect(() => {
		let lastY = window.scrollY;
		let ticking = false;

		const update = () => {
			const y = window.scrollY;
			setIsScrolled(y > SCROLL_THRESHOLD);

			const delta = y - lastY;
			if (Math.abs(delta) > DIRECTION_DEADZONE) {
				setIsHidden(y > HIDE_THRESHOLD && delta > 0);
				lastY = y;
			}
			ticking = false;
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close the menu whenever the route changes
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	// While the menu is open: lock the page scroll and close on Escape
	useEffect(() => {
		if (!isMenuOpen) return;

		document.body.classList.add("no-scroll");
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.classList.remove("no-scroll");
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isMenuOpen]);

	// At the top of the home page the bar sits on the dark hero: light text, no surface
	const isOnHero = isHome && !isScrolled && !isMenuOpen;
	// On the home page the hero owns the title until the user scrolls
	const showWordmark = !isHome || isScrolled;

	const headerClassName = [
		"header",
		isScrolled && "header--scrolled",
		isHidden && !isMenuOpen && "header--hidden",
		isOnHero && "header--on-hero",
		isMenuOpen && "header--menu-open",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<>
			<header className={headerClassName}>
				<motion.div
					className="header__inner"
					initial={{ y: -12, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.6,
						delay: 0.2,
						ease: EASINGS.standard,
					}}
				>
					<Link
						to="/"
						className="header__brand"
						aria-label="Genuflexio"
					>
						<span className="header__logo" aria-hidden="true">
							<Logo color="currentColor" />
						</span>
						{showWordmark && (
							<motion.span
								className="header__wordmark"
								layoutId="website-title"
							>
								Genuflexio
							</motion.span>
						)}
					</Link>

					<nav className="header__nav" aria-label={t("nav.main")}>
						{NAV_ITEMS.map(({ to, labelKey, end }) => (
							<NavLink
								key={to}
								to={to}
								end={end}
								className="header__link"
							>
								{t(labelKey)}
							</NavLink>
						))}
					</nav>

					<div className="header__tools">
						<div className="header__tools-desktop">
							<LanguageDropDown />
							<ThemeToggle />
						</div>
						<BurgerIcon
							isOpen={isMenuOpen}
							onClick={() => setIsMenuOpen((open) => !open)}
						/>
					</div>
				</motion.div>
			</header>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className="header-menu"
						role="dialog"
						aria-modal="true"
						aria-label={t("nav.main")}
						variants={menuOverlay}
						initial="hidden"
						animate="show"
						exit="hidden"
					>
						<motion.nav
							className="header-menu__nav"
							variants={menuList}
						>
							{NAV_ITEMS.map(({ to, labelKey, end }, index) => (
								<motion.div key={to} variants={menuItem}>
									<NavLink
										to={to}
										end={end}
										className="header-menu__link"
									>
										<span className="header-menu__index">
											{String(index + 1).padStart(2, "0")}
										</span>
										{t(labelKey)}
									</NavLink>
								</motion.div>
							))}
						</motion.nav>

						<motion.div
							className="header-menu__footer"
							variants={menuFooter}
						>
							<a
								href="https://github.com/cybreuil"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
							<a href="mailto:cybreuil@gmail.com">
								{t("nav.contact")}
							</a>
							<div className="header-menu__tools">
								<LanguageDropDown />
								<ThemeToggle />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export { Header };
