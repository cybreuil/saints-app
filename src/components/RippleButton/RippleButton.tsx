import { useState } from "react";
import { motion } from "framer-motion";
import "./RippleButton.css";

interface Ripple {
	x: number;
	y: number;
	id: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	rippleColor?: string;
	rippleDuration?: number;
}

export function RippleButton({
	children,
	onClick,
	rippleColor = "rgba(255, 255, 255, 0.6)",
	rippleDuration = 0.6,
	className = "",
	...props
}: RippleButtonProps) {
	const [ripples, setRipples] = useState<Ripple[]>([]);

	const createRipple = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.TouchEvent<HTMLButtonElement>,
	) => {
		const button = e.currentTarget;
		const rect = button.getBoundingClientRect();

		// Gère à la fois souris et touch
		let x: number, y: number;

		if ("touches" in e) {
			// Touch event
			x = e.touches[0].clientX - rect.left;
			y = e.touches[0].clientY - rect.top;
		} else {
			// Mouse event
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
		}

		const newRipple: Ripple = {
			x,
			y,
			id: Date.now() + Math.random(), // ID unique
		};

		setRipples((prev) => [...prev, newRipple]);

		// Nettoie le ripple après l'animation
		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
		}, rippleDuration * 1000);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// Appelle le onClick parent s'il existe
		onClick?.(e);
	};

	return (
		<button
			{...props}
			className={`ripple-button ${className}`}
			onMouseDown={createRipple}
			onTouchStart={createRipple}
			onClick={handleClick}
		>
			{children}
			{ripples.map((ripple) => (
				<motion.span
					key={ripple.id}
					className="ripple-effect"
					style={{
						left: ripple.x,
						top: ripple.y,
						background: rippleColor,
					}}
					initial={{ width: 0, height: 0, opacity: 1 }}
					animate={{ width: 300, height: 300, opacity: 0 }}
					transition={{ duration: rippleDuration, ease: "easeOut" }}
				/>
			))}
		</button>
	);
}
