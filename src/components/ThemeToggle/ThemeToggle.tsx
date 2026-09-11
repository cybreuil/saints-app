import "./ThemeToggle.css";
import { useTheme } from "../../hooks/useTheme";
import { LightModeIcon, DarkModeIcon } from "../../icons";

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
					<span className="slider-icon sun">
						<LightModeIcon />
					</span>
					<span className="slider-icon moon">
						<DarkModeIcon />
					</span>
				</span>
			</label>
		</div>
	);
};
