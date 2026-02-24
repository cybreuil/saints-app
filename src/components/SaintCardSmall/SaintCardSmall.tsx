import { motion } from "framer-motion";
import "./SaintCardSmall.css";
import { TRANSITIONS } from "../../styles/theme";

const SaintCardSmall = ({
	saint,
	onClick,
}: {
	saint: {
		id: string;
		name: string;
		sex: string;
		feastDay: string;
		description: string;
		image: string;
		attributes: string;
		patronage: string;
	};
	onClick: () => void;
}) => {
	return (
		<motion.div
			className="saint-card-small"
			layoutId={`saint-${saint.id}`}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			whileHover={{
				scale: 1.03,
				translateY: -5,
				boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
			}}
			transition={TRANSITIONS.normal}
			onClick={onClick}
		>
			<motion.img
				// Super useful for animation between list and modal / need to remember
				layoutId={`saint-img-${saint.id}`}
				src={saint.image || "/logoOptimized.svg"}
				alt={saint.name}
				loading="lazy"
				transition={TRANSITIONS.normal}
			/>
			<div className="saint-card-small__overlay">
				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={TRANSITIONS.normal}
					layoutId={`saint-name-${saint.id}`}
				>
					{saint.name}
				</motion.h3>
				<motion.p
					layoutId={`saint-feastDay-${saint.id}`}
					transition={TRANSITIONS.normal}
				>
					{saint.feastDay}
				</motion.p>
			</div>
		</motion.div>
	);
};

export { SaintCardSmall };
