import React, { useState } from "react";
import "./DatePickerModal.css";

interface DatePickerModalProps {
	open: boolean;
	onClose: () => void;
	onSelect: (date: string) => void;
	initialDate?: string;
	minDate?: string;
	maxDate?: string;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
	open,
	onClose,
	onSelect,
	initialDate,
	minDate,
	maxDate,
}) => {
	const [value, setValue] = useState(initialDate || "");

	if (!open) return null;

	return (
		<div className="date-picker-modal-backdrop" onClick={onClose}>
			<div
				className="date-picker-modal"
				onClick={(e) => e.stopPropagation()}
			>
				<h3>Choisir une date</h3>
				<input
					type="date"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					min={minDate}
					max={maxDate}
				/>
				<div className="date-picker-modal-actions">
					<button
						onClick={() => {
							if (value) onSelect(value);
							onClose();
						}}
						disabled={!value}
					>
						Valider
					</button>
					<button onClick={onClose}>Annuler</button>
				</div>
			</div>
		</div>
	);
};
