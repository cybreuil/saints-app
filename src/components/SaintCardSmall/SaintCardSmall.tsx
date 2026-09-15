import "./SaintCardSmall.css";
import { motion } from "framer-motion";
import type { SaintApi } from "../../types/Saint.ts";

const cardReveal = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
	},
};

const ROMAN: [number, string][] = [
	[1000, "M"],
	[900, "CM"],
	[500, "D"],
	[400, "CD"],
	[100, "C"],
	[90, "XC"],
	[50, "L"],
	[40, "XL"],
	[10, "X"],
	[9, "IX"],
	[5, "V"],
	[4, "IV"],
	[1, "I"],
];

export function toRoman(value: number): string {
	let n = Math.floor(value);
	if (n <= 0) return String(value);
	let out = "";
	for (const [num, glyph] of ROMAN) {
		while (n >= num) {
			out += glyph;
			n -= num;
		}
	}
	return out;
}

function accentLabel(saint: SaintApi): string {
	if (saint.life_label) return saint.life_label;
	if (saint.century) {
		return `${toRoman(saint.century)}${saint.century === 1 ? "er" : "e"} siècle`;
	}
	return "\u00a0";
}

const SaintCardSmall = ({
	saint,
	onClick,
	index,
}: {
	saint: SaintApi;
	onClick: () => void;
	index: number;
}) => {
	const initial = saint.name?.trim().charAt(0).toUpperCase() ?? "";

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<motion.article
			className="saint-card"
			layoutId={`saint-${saint.id}`}
			variants={cardReveal}
			role="button"
			tabIndex={0}
			aria-label={saint.name}
			onClick={onClick}
			onKeyDown={handleKeyDown}
		>
			<div className="saint-card__artwork" aria-hidden="true">
				{saint.image_url ? (
					<motion.img
						layoutId={`saint-img-${saint.id}`}
						src={saint.image_url}
						alt=""
						loading={index < 3 ? "eager" : "lazy"}
						decoding="async"
						draggable={false}
					/>
				) : (
					<span className="saint-card__initial">{initial}</span>
				)}
			</div>

			<div className="saint-card__body">
				<span className="saint-card__accent">{accentLabel(saint)}</span>
				<motion.h3
					className="saint-card__name"
					layoutId={`saint-name-${saint.id}`}
				>
					{saint.name}
				</motion.h3>
				<span className="saint-card__cta">Découvrir →</span>
			</div>
		</motion.article>
	);
};

export { SaintCardSmall };
