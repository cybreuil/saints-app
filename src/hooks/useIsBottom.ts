import { useEffect, useState } from "react";

export function useIsBottom(offset = 0) {
	const [isBottom, setIsBottom] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.innerHeight + window.scrollY;
			const pageHeight = document.body.offsetHeight;
			setIsBottom(scrollPosition >= pageHeight - offset);
		};
		window.addEventListener("scroll", handleScroll);

		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, [offset]);

	return isBottom;
}
