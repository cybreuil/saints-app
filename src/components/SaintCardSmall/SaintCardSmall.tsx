import "./SaintCardSmall.css";

const SaintCardSmall = ({
	saint,
}: {
	saint: { id: number; name: string; feastDay: string; image?: string };
}) => {
	return (
		<div className="saint-card-small" key={saint.id}>
			<img src={saint.image || "/logoOptimized.svg"} alt={saint.name} />
			<h3>{saint.name}</h3>
			<p>{saint.feastDay}</p>
		</div>
	);
};

export { SaintCardSmall };
