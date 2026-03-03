import "./LiturgicalRank.css";

const RANKS = {
	1: "Solemnity",
	2: "Feast",
	3: "Memorial",
	4: "Optional Memorial",
	5: "Commemoration",
};

const LiturgicalRank = () => {
	return (
		<div className="liturgical-rank">
			<h3>Liturgical Rank</h3>
			<div className="rank-item">
				<span className="rank-name">{RANKS[1]}</span>
			</div>
		</div>
	);
};

export { LiturgicalRank };
