import "./SaintCardSmall.css";

const SaintCardSmall = ({
	saint,
}: {
	saint: { id: number; name: string; feastDay: string; image?: string };
}) => {
	return (
		<div className="saint-card-small" key={saint.id}>
			<img
				src={saint.image || "/logoOptimized.svg"}
				alt={saint.name}
				loading="lazy"
			/>
			<div className="saint-card-small__overlay">
				<h3>{saint.name}</h3>
				<p>{saint.feastDay}</p>
			</div>
		</div>
	);
};

export { SaintCardSmall };
