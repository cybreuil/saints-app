import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./FullCalendarModal.css";
// Todo portal

type Props = {
	initialDate?: string; // YYYY-MM-DD
	onClose: () => void;
	onSelect: (dateStr: string) => void;
	open?: boolean;
};

function formatDate(d: Date) {
	return d.toISOString().slice(0, 10);
}

function startOfMonth(d: Date) {
	return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
	return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addMonths(d: Date, delta: number) {
	return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function getMonthGrid(forDate: Date) {
	// returns array of Date objects covering the 6x7 calendar grid
	const start = startOfMonth(forDate);
	const end = endOfMonth(forDate);
	const startWeekday = start.getDay(); // 0 = Sun, 1 = Mon...
	// We'll display weeks starting on Monday for consistency with mini-calendar:
	const shift = (startWeekday + 6) % 7; // Monday=0
	const gridStart = new Date(start);
	gridStart.setDate(start.getDate() - shift);

	const cells: Date[] = [];
	for (let i = 0; i < 42; i++) {
		const d = new Date(gridStart);
		d.setDate(gridStart.getDate() + i);
		cells.push(d);
	}
	return cells;
}

export const FullCalendarModal: React.FC<Props> = ({
	initialDate,
	onClose,
	onSelect,
	open = false,
}) => {
	const today = new Date();
	const init = initialDate ? new Date(initialDate) : today;
	const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(init));
	const [selectedDate, setSelectedDate] = useState<string>(
		initialDate ? initialDate : formatDate(today),
	);

	useEffect(() => {
		// keep viewMonth in sync if initialDate prop changes
		if (initialDate) {
			const d = new Date(initialDate);
			setViewMonth(startOfMonth(d));
			setSelectedDate(initialDate);
		}
	}, [initialDate]);

	// focus management
	const modalRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (open) {
			// focus the modal container for keyboard listeners
			modalRef.current?.focus();
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") onClose();
	};

	const cells = getMonthGrid(viewMonth);
	const monthLabel = viewMonth.toLocaleDateString("fr-FR", {
		month: "long",
		year: "numeric",
	});

	const isSameDay = (a: Date, b: Date) =>
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate();

	return (
		<motion.div
			className="fc-overlay"
			initial={{ opacity: 0 }}
			animate={open ? { opacity: 1 } : { opacity: 0 }}
			exit={{ opacity: 0 }}
			style={{ pointerEvents: open ? "auto" : "none" }}
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<motion.div
				className="fc-modal"
				role="dialog"
				aria-modal="true"
				aria-label="Sélectionner une date"
				tabIndex={-1}
				ref={modalRef}
				onKeyDown={handleKeyDown}
				initial={{ y: 20, opacity: 0, scale: 0.98 }}
				animate={
					open
						? { y: 0, opacity: 1, scale: 1 }
						: { y: 20, opacity: 0, scale: 0.98 }
				}
				transition={{ duration: 0.18 }}
				onClick={(e) => e.stopPropagation()}
			>
				<header className="fc-header">
					<button
						type="button"
						className="fc-nav-btn"
						aria-label="Mois précédent"
						onClick={() => setViewMonth((m) => addMonths(m, -1))}
					>
						‹
					</button>
					<div className="fc-title">{monthLabel}</div>
					<button
						type="button"
						className="fc-nav-btn"
						aria-label="Mois suivant"
						onClick={() => setViewMonth((m) => addMonths(m, 1))}
					>
						›
					</button>
				</header>

				<div className="fc-weekdays">
					{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
						(w) => (
							<div key={w} className="fc-weekday">
								{w}
							</div>
						),
					)}
				</div>

				<div className="fc-grid">
					{cells.map((d) => {
						const dateStr = formatDate(d);
						const inCurrentMonth =
							d.getMonth() === viewMonth.getMonth();
						const isToday = isSameDay(d, today);
						const isSelected = dateStr === selectedDate;
						return (
							<button
								key={dateStr}
								className={`mini-calendar-day fc-day ${inCurrentMonth ? "" : "fc-day-outside"}${isSelected ? " selected" : ""}${isToday ? " today" : ""}`}
								onClick={() => {
									setSelectedDate(dateStr);
									onSelect(dateStr);
									onClose();
								}}
								aria-current={isSelected ? "date" : undefined}
								tabIndex={open ? 0 : -1}
							>
								<span className="mini-calendar-day-label">
									{d.toLocaleDateString("fr-FR", {
										weekday: "short",
									})}
								</span>
								<span className="mini-calendar-day-num">
									{d.getDate()}
								</span>
							</button>
						);
					})}
				</div>

				<footer className="fc-footer">
					<button
						type="button"
						className="fc-btn fc-btn-cancel"
						onClick={onClose}
					>
						Annuler
					</button>
					<button
						type="button"
						className="fc-btn fc-btn-today"
						onClick={() => {
							const todayStr = formatDate(today);
							setViewMonth(startOfMonth(today));
							setSelectedDate(todayStr);
							onSelect(todayStr);
							onClose();
						}}
					>
						Aujourd'hui
					</button>
				</footer>
			</motion.div>
		</motion.div>
	);
};

export default FullCalendarModal;
