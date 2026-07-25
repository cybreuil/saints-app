import "./LiturgicalRank.css";

const LiturgicalRank = ({ rank }: { rank: string }) => {
	return (
		<div className="liturgical-rank">
			<h3>Liturgical Rank</h3>
			<div className="rank-item">
				<span className="rank-name">{rank}</span>
			</div>
		</div>
	);
};

export { LiturgicalRank };
