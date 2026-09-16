import "./Pagination.css";

type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

type Item = number | "gap";

/** 1 … 4 5 [6] 7 8 … 20 — toujours première/dernière + voisines */
function buildItems(current: number, total: number, siblings = 1): Item[] {
	if (total <= 5 + siblings * 2) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}
	const start = Math.max(2, current - siblings);
	const end = Math.min(total - 1, current + siblings);
	const items: Item[] = [1];
	if (start > 2) items.push("gap");
	for (let p = start; p <= end; p++) items.push(p);
	if (end < total - 1) items.push("gap");
	items.push(total);
	return items;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
	if (totalPages <= 1) return null;

	const items = buildItems(currentPage, totalPages);

	return (
		<nav className="pagination" aria-label="Pagination">
			<button
				type="button"
				className="pagination__arrow"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				aria-label="Page précédente"
			>
				←
			</button>

			<ol className="pagination__list">
				{items.map((item, i) =>
					item === "gap" ? (
						<li
							key={`gap-${i}`}
							className="pagination__gap"
							aria-hidden="true"
						>
							…
						</li>
					) : (
						<li key={item}>
							<button
								type="button"
								className={`pagination__page${
									item === currentPage
										? " pagination__page--current"
										: ""
								}`}
								onClick={() => onPageChange(item)}
								aria-current={
									item === currentPage ? "page" : undefined
								}
								aria-label={`Page ${item}`}
							>
								{item}
							</button>
						</li>
					),
				)}
			</ol>

			<button
				type="button"
				className="pagination__arrow"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				aria-label="Page suivante"
			>
				→
			</button>
		</nav>
	);
};

export { Pagination };
