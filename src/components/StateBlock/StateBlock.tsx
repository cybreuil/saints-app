import { motion } from "framer-motion";
import type { ReactNode } from "react";

function StateBlock({
	tone = "neutral",
	children,
}: {
	tone?: "neutral" | "error";
	children: ReactNode;
}) {
	return (
		<motion.div
			className={`saints-state saints-state--${tone}`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			{children}
		</motion.div>
	);
}

export { StateBlock };
