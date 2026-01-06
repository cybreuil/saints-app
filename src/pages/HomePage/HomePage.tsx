import { Logo } from "../../components/Logo/Logo";
import "./HomePage.css";

const HomePage = () => {
	return (
		<div className="presentation">
			<Logo color="var(--color-primary)" maxWidth={600} />
			<h1>Saints-App</h1>
			<p>React App for catholic saints information.</p>
		</div>
	);
};

export { HomePage };
