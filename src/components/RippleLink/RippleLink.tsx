import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import "./RippleLink.css";

interface Ripple {
	x: number;
	y: number;
	id: number;
}

interface RippleLinkProps extends LinkProps {
	children: React.ReactNode;
	rippleColor?: string;
	rippleDuration?: number;
	className?: string;
}

export function RippleLink({
	children,
	rippleColor = "rgba(0, 0, 0, 0.15)",
	rippleDuration = 0.6,
	className = "",
	...props
}: RippleLinkProps) {
	const [ripples, setRipples] = useState<Ripple[]>([]);

	const createRipple = (
		e:
			| React.MouseEvent<HTMLAnchorElement>
			| React.TouchEvent<HTMLAnchorElement>,
	) => {
		const link = e.currentTarget;
		const rect = link.getBoundingClientRect();

		let x: number, y: number;

		if ("touches" in e) {
			x = e.touches[0].clientX - rect.left;
			y = e.touches[0].clientY - rect.top;
		} else {
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
		}

		const newRipple: Ripple = {
			x,
			y,
			id: Date.now() + Math.random(),
		};

		setRipples((prev) => [...prev, newRipple]);

		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
		}, rippleDuration * 1000);
	};

	return (
		<Link
			{...props}
			className={`ripple-link ${className}`}
			onMouseDown={createRipple}
			onTouchStart={createRipple}
		>
			{children}
			{ripples.map((ripple) => (
				<motion.span
					key={ripple.id}
					className="ripple-link__effect"
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
		</Link>
	);
}
