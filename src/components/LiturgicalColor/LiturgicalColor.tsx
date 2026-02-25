import "./LiturgicalColor.css";

const LiturgicalColor = ({
	color,
	colorName,
}: {
	color: string;
	colorName: string;
}) => {
	return (
		<div className="liturgical-color">
			Couleur liturgique :
			{!color ? (
				<p>Inconnue</p>
			) : (
				<>
					<div className="liturgical-color__infos">
						<div
							className="liturgical-color__circle"
							style={{ backgroundColor: color }}
							title={colorName}
							aria-label={`Couleur liturgique : ${colorName}`}
						/>
						<p className="liturgical-color__name">{colorName}</p>
					</div>
				</>
			)}
		</div>
	);
};

export { LiturgicalColor };
