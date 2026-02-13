export const EASINGS = {
	standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
	in: [0.4, 0, 1, 1] as [number, number, number, number],
	out: [0, 0, 0.2, 1] as [number, number, number, number],
	linear: [0, 0, 1, 1] as [number, number, number, number],
	circIn: [0.55, 0, 1, 0.45] as [number, number, number, number],
	circOut: [0, 0.55, 0.45, 1] as [number, number, number, number],
	circInOut: [0.85, 0, 0.15, 1] as [number, number, number, number],
	backIn: [0.6, -0.28, 0.735, 0.045] as [number, number, number, number],
	backOut: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
	backInOut: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
};

export const TRANSITIONS = {
	fast: { duration: 0.15, ease: EASINGS.standard },
	normal: { duration: 0.3, ease: EASINGS.standard },
	slow: { duration: 0.5, ease: EASINGS.standard },
	slower: { duration: 0.8, ease: EASINGS.standard },
	fadeIn: { duration: 0.4, ease: EASINGS.in },
	fadeOut: { duration: 0.4, ease: EASINGS.out },
	bounce: { duration: 0.6, ease: EASINGS.backOut },
	circ: { duration: 0.4, ease: EASINGS.circInOut },
	linear: { duration: 0.3, ease: EASINGS.linear },
	// SPRING
	spring: { type: "spring", stiffness: 500, damping: 30 },
	gentleSpring: { type: "spring", stiffness: 200, damping: 25 },
	bouncySpring: { type: "spring", stiffness: 700, damping: 15 },
};
