import "./App.css";
import { Link } from "react-router-dom";

function App() {
	return (
		<>
			<div className="presentation">
				<img src="/logo.svg" />
				<h1>Saints-App</h1>
				<p>React App for catholic saints information.</p>
				<Link className="link-today" to="/saint-of-the-day">
					Saint Du Jour
				</Link>
			</div>
		</>
	);
}

export { App };
