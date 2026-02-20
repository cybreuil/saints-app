import { motion } from "framer-motion";
import "./SaintCardSmall.css";

const SaintCardSmall = ({
	saint,
}: {
	saint: { id: number; name: string; feastDay: string; image?: string };
}) => {
	return (
		<div className="saint-card-small" key={saint.id}>
			<motion.img
				// Super useful for animation between list and modal / need to remember
				layoutId={`saint-img-${saint.id}`}
				src={saint.image || "/logoOptimized.svg"}
				alt={saint.name}
				loading="lazy"
			/>
			<div className="saint-card-small__overlay">
				<motion.	h3 layoutId={`saint-name-${saint.id}`}>
					{saint.name}
				</motion.h3>
				<p>{saint.feastDay}</p>
			</div>
		</div>
	);
};

export { SaintCardSmall };
