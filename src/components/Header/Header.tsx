import { Logo } from "../Logo/Logo";
import "./Header.css";

const Header = () => {
	return (
		<header>
			<Logo maxWidth={100} />
			<h1>Saints App</h1>
		</header>
	);
};

export { Header };
