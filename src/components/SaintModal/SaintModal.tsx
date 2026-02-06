import { motion } from "framer-motion";
import { useEffect } from "react";
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
	// Close with Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	// No scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<>
			<motion.div
				className="saint-modal__backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
				exit={{ opacity: 0 }}
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
