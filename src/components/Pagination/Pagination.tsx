import "./Pagination.css";

type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
	if (totalPages <= 1) return null;

	return (
		<nav className="pagination" aria-label="Pagination">
			<button
				className="pagination__btn"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				← Prev
			</button>

			<span className="pagination__info">
				Page {currentPage} / {totalPages}
			</span>

			<button
				className="pagination__btn"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next →
			</button>
		</nav>
	);
};

export { Pagination };
