import "./BurgerIcon.css";

const BurgerIcon = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) => {
	return (
		<div
			className={`burger-icon ${isOpen ? "open" : ""}`}
			onClick={onClick}
			aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					onClick();
				}
			}}
		>
			<span className="bar1" />
			<span className="bar2" />
			<span className="bar3" />
		</div>
	);
};

export { BurgerIcon };
