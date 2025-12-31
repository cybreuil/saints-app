import { Logo } from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
	return (
		<div className="presentation">
			<Logo color="brown" />
			<h1>Saints-App</h1>
			<p>React App for catholic saints information.</p>
			<Link className="link-today" to="/saint-of-the-day">
				Saint Du Jour
			</Link>
		</div>
	);
};

export { HomePage };
