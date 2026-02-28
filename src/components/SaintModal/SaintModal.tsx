import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import "./SaintModal.css";
import { TRANSITIONS } from "../../styles/theme";
import { RippleButton } from "../RippleButton/RippleButton";

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
			{/*AnimatePresence is called in the page*/}
			<motion.div
				className="saint-modal__backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				transition={TRANSITIONS.normal}
			/>
			<motion.div
				className="saint-modal"
				layoutId={`saint-${saint.id}`}
				// initial={{ opacity: 0 }}
				// animate={{ opacity: 1 }}
				transition={TRANSITIONS.normal}
			>
				<div className="saint-modal-layout">
					<div className="saint-modal__left">
						<motion.div
							className="saint-modal__left__top"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{
								opacity: 0,
								transition: TRANSITIONS.fast,
							}}
							transition={{ ...TRANSITIONS.slower }}
						>
							<button
								className="saint-modal__close"
								onClick={onClose}
							>
								← Retour
							</button>
						</motion.div>
						<motion.img
							layoutId={`saint-img-${saint.id}`}
							src={saint.image || "/logoOptimized.svg"}
							alt={saint.name}
							className="saint-modal__img"
							transition={TRANSITIONS.normal}
						/>
						<motion.div
							className="saint-modal__left__bottom"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{
								opacity: 0,
								transition: TRANSITIONS.fast,
							}}
							transition={TRANSITIONS.slower}
						>
							<RippleButton
								className="link-button"
								onClick={() => alert("Voir la fiche complète")}
							>
								{saint.sex === "female"
									? "Voir la fête de cette sainte"
									: "Voir la fête de ce saint"}
							</RippleButton>
							<p className="saint-modal__id">ID : {saint.id}</p>
						</motion.div>
					</div>
					<div className="saint-modal__content">
						<motion.h2
							layoutId={`saint-name-${saint.id}`}
							transition={TRANSITIONS.normal}
						>
							{saint.name}
						</motion.h2>
						<motion.p
							className="saint-modal__content__date"
							layoutId={`saint-feastDay-${saint.id}`}
							transition={TRANSITIONS.normal}
						>
							{saint.feastDay}
						</motion.p>
						{saint.description && (
							<motion.p
								className="saint-modal__content__description"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{
									opacity: 0,
									transition: TRANSITIONS.fast,
								}}
								transition={TRANSITIONS.slower}
							>
								{saint.description}
							</motion.p>
						)}
						<motion.div
							className="saint-modal__content__columns"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: TRANSITIONS.fast }}
							transition={TRANSITIONS.slower}
						>
							{saint.attributes && (
								<p className="saint-modal__content__attributes">
									Attributs :{" "}
									<ul>
										{saint.attributes
											.split(",")
											.map((attr, index) => (
												<li key={index}>
													{attr.trim()}
												</li>
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
												<li key={index}>
													{pat.trim()}
												</li>
											))}
									</ul>
								</p>
							)}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</>,
		document.body,
	);
}
