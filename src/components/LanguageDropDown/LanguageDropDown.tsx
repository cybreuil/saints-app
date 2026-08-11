import type { LanguageCode } from "../../types/Language";
import { useLanguage } from "../../hooks/useLanguage";

const LanguageDropDown = () => {
	const { setLanguageCode } = useLanguage();

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguageCode(e.target.value as LanguageCode);
	};

	return (
		<div>
			<select onChange={onChange} defaultValue={localStorage.getItem("language_code") || "en"}>
				<option value="en">English</option>
				<option value="fr">Français</option>
				<option value="la">Latina</option>
			</select>
		</div>
	);
};

export { LanguageDropDown };
