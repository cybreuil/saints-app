import { Logo } from "../Logo/Logo";
import "./Header.css";

const Header = () => {
	return (
		<header className="header">
			<Logo maxWidth={50} />
			<h1>Saints App</h1>
		</header>
	);
};

export { Header };
