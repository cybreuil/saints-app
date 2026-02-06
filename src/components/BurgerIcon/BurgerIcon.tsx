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
		>
			<span />
			<span />
			<span />
		</div>
	);
};

export { BurgerIcon };
