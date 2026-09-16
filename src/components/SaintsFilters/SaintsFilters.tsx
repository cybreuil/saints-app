import "./SaintsFilters.css";
import type { SaintSort } from "../../hooks/useSaints";
import { toRoman } from "../../utils/saintFormat";

export type SaintsFiltersValue = {
	query: string;
	century: string; // "all" | "unknown" | "1".."21"
	sort: SaintSort;
};

export const DEFAULT_FILTERS: SaintsFiltersValue = {
	query: "",
	century: "all",
	sort: "name_asc",
};

const CENTURIES = Array.from({ length: 21 }, (_, i) => i + 1);

const SORT_OPTIONS: { value: SaintSort; label: string }[] = [
	{ value: "name_asc", label: "Nom, A → Z" },
	{ value: "name_desc", label: "Nom, Z → A" },
	{ value: "century_asc", label: "Siècle, du plus ancien" },
	{ value: "century_desc", label: "Siècle, du plus récent" },
];

type Props = {
	value: SaintsFiltersValue;
	onChange: (next: SaintsFiltersValue) => void;
	resultCount?: number;
};

const SaintsFilters = ({ value, onChange, resultCount }: Props) => {
	const isDirty =
		value.query !== DEFAULT_FILTERS.query ||
		value.century !== DEFAULT_FILTERS.century ||
		value.sort !== DEFAULT_FILTERS.sort;

	return (
		<form
			className="saints-filters"
			role="search"
			aria-label="Filtrer les saints"
			onSubmit={(e) => e.preventDefault()}
		>
			<label className="saints-filters__field saints-filters__field--grow">
				<span className="saints-filters__label">Recherche</span>
				<input
					type="search"
					placeholder="Nom d'un saint…"
					value={value.query}
					onChange={(e) =>
						onChange({ ...value, query: e.target.value })
					}
					autoComplete="off"
				/>
			</label>

			<label className="saints-filters__field">
				<span className="saints-filters__label">Siècle</span>
				<select
					value={value.century}
					onChange={(e) =>
						onChange({ ...value, century: e.target.value })
					}
				>
					<option value="all">Tous</option>
					{CENTURIES.map((c) => (
						<option key={c} value={c}>
							{toRoman(c)}
							{c === 1 ? "er" : "e"}
						</option>
					))}
					<option value="unknown">Inconnu</option>
				</select>
			</label>

			<label className="saints-filters__field">
				<span className="saints-filters__label">Tri</span>
				<select
					value={value.sort}
					onChange={(e) =>
						onChange({
							...value,
							sort: e.target.value as SaintSort,
						})
					}
				>
					{SORT_OPTIONS.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
			</label>

			<div className="saints-filters__end">
				{typeof resultCount === "number" && (
					<span className="saints-filters__count" aria-live="polite">
						{resultCount} {resultCount > 1 ? "saints" : "saint"}
					</span>
				)}
				{isDirty && (
					<button
						type="button"
						className="saints-filters__reset"
						onClick={() => onChange(DEFAULT_FILTERS)}
					>
						Réinitialiser
					</button>
				)}
			</div>
		</form>
	);
};

export { SaintsFilters };
