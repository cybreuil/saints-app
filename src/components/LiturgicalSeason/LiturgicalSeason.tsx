import { useLanguage } from "../../hooks/useLanguage";
import "./LiturgicalSeason.css";

const LiturgicalSeason = ({ season }: { season: string }) => {
	const {t} = useLanguage();

	return (
		<div className="liturgical-season">
			<h3>{t("liturgical.season")}</h3>
			<div className="season-item">
				<span className="season-name">{season}</span>
			</div>
		</div>
	);
};

export { LiturgicalSeason };
