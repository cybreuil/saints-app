import { Logo } from "../Logo/Logo";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<Logo />
			<h1>Saints-App</h1>
			<nav className="header-nav">
				<Link to="/">Home</Link>
				<Link to="/saint-of-the-day">Saint of the Day</Link>
			</nav>
		</header>
	);
};

export { Header };
