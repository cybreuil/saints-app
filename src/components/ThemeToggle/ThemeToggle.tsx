// import { useTheme } from "../../context/ThemeContext";
// import { LightModeLogo } from "../../icons/mainMenu/LightModeIcon";
//import { DarkModeLogo } from "../../icons/mainMenu/DarkModeIcon";
import "./ThemeToggle.css";
import { useState } from "react";

export const ThemeToggle = () => {
	const [theme, setTheme] = useState("light"); // "light" ou "dark"

	return (
		<div className="theme-toggle-wrapper">
			<label className="theme-switch">
				<input
					type="checkbox"
					checked={theme === "dark"}
					onChange={setTheme.bind(
						null,
						theme === "light" ? "dark" : "light",
					)}
				/>
				<span className="slider">
					<span className="slider-icon sun">☀️</span>
					<span className="slider-icon moon">🌙</span>
				</span>
			</label>
		</div>
	);
};
