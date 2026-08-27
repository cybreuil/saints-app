import { useLanguage } from "../../hooks/useLanguage";
import "./LiturgicalRank.css";

const LiturgicalRank = ({ rank }: { rank: string }) => {
	const {t} = useLanguage();

	return (
		<div className="liturgical-rank">
			<h3>{t("liturgical.rank")}</h3>
			<div className="rank-item">
				<span className="rank-name">{rank}</span>
			</div>
		</div>
	);
};

export { LiturgicalRank };
