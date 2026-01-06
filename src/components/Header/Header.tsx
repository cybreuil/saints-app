import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	return (
		<header className="header">
			<Logo />
			<h1 className="header-title">Saints-App</h1>
			<nav className="header-nav">
				<Link to="/">Home</Link>
				<Link to="/saint-of-the-day">Saint of the Day</Link>
			</nav>
		</header>
	);
};

export { Header };
