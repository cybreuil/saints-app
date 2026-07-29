// import { useTheme } from "../../context/ThemeContext";
// import { LightModeLogo } from "../../icons/mainMenu/LightModeIcon";
//import { DarkModeLogo } from "../../icons/mainMenu/DarkModeIcon";
import "./ThemeToggle.css";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {

	const { theme, toggleTheme } = useTheme();

	return (
		<div className="theme-toggle-wrapper">
			<label className="theme-switch">
				<input
					type="checkbox"
					checked={theme === "dark"}
					onChange={toggleTheme}
				/>
				<span className="slider">
					<span className="slider-icon sun">☀️</span>
					<span className="slider-icon moon">🌙</span>
				</span>
			</label>
		</div>
	);
};
