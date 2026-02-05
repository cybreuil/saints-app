import { motion, AnimatePresence } from "framer-motion";
import "./SaintModal.css";

export function SaintModal({
	saint,
	onClose,
}: {
	saint: {
		id: number;
		name: string;
		feastDay: string;
		image?: string;
		description?: string;
	};
	onClose: () => void;
}) {
	return (
		<>
			<motion.div
				className="saint-modal__backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				onClick={onClose}
			/>
			<motion.div
				className="saint-modal"
				layoutId={`saint-${saint.id}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<img
					src={saint.image || "/logoOptimized.svg"}
					alt={saint.name}
					className="saint-modal__img"
				/>
				<div className="saint-modal__content">
					<h2>{saint.name}</h2>
					<p>{saint.feastDay}</p>
					{saint.description && <p>{saint.description}</p>}
					<button className="saint-modal__close" onClick={onClose}>
						Fermer
					</button>
				</div>
			</motion.div>
		</>
	);
}
