import { createPortal } from "react-dom";
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

	return createPortal(
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
				<motion.img
					layoutId={`saint-img-${saint.id}`}
					src={saint.image || "/logoOptimized.svg"}
					alt={saint.name}
					className="saint-modal__img"
				/>
				<div className="saint-modal__content">
					<motion.h2 layoutId={`saint-name-${saint.id}`}>
						{saint.name}
					</motion.h2>
					<p className="saint-modal__content__date">
						{saint.feastDay}
					</p>
					{saint.description && (
						<p className="saint-modal__content__description">
							{saint.description}
						</p>
					)}
					<div className="saint-modal__content__columns">
						{saint.attributes && (
							<p className="saint-modal__content__attributes">
								Attributs :{" "}
								<ul>
									{saint.attributes
										.split(",")
										.map((attr, index) => (
											<li key={index}>{attr.trim()}</li>
										))}
								</ul>
							</p>
						)}
						{saint.patronage && (
							<p className="saint-modal__content__patronage">
								Patronage :{" "}
								<ul>
									{saint.patronage
										.split(",")
										.map((pat, index) => (
											<li key={index}>{pat.trim()}</li>
										))}
								</ul>
							</p>
						)}
					</div>
					<button className="saint-modal__close" onClick={onClose}>
						Fermer
					</button>
				</div>
			</motion.div>
		</>,
		document.getElementById("modal-root")!,
	);
}
