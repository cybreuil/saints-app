import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="presentation">
				<h1>Saints-App</h1>
				<p>React App for catholic saints information.</p>
			</div>
		</>
	);
}

export { App };
