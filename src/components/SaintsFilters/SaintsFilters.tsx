import "./SaintsFilters.css";

type SortValue = "name_asc" | "name_desc" | "feast_asc" | "feast_desc";

type SaintsFiltersProps = {
	query: string;
	onQueryChange: (value: string) => void;
	century: string;
	onCenturyChange: (value: string) => void;
	sortKey: SortValue;
	onSortByChange: (value: SortValue) => void;
	centuries: string[];
};

const SaintsFilters = ({
	query,
	onQueryChange,
	century,
	onCenturyChange,
	sortKey,
	onSortByChange,
	centuries,
}: SaintsFiltersProps) => {
	return (
		<form
			className="saints-filters"
			onSubmit={(e) => e.preventDefault()}
			aria-label="Filtres des saints"
		>
			<div className="saints-filters__group">
				<label htmlFor="saints-query">Recherche</label>
				<input
					id="saints-query"
					type="search"
					placeholder="Nom du saint..."
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
				/>
			</div>

			<div className="saints-filters__group">
				<label htmlFor="saints-century">Siècle</label>
				<select
					id="saints-century"
					value={century}
					onChange={(e) => onCenturyChange(e.target.value)}
				>
					<option value="all">Tous les siècles</option>
					<option value="unknown">Inconnu</option>
					{centuries.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>

			<div className="saints-filters__group">
				<label htmlFor="saints-sort">Trier par</label>
				<select
					id="saints-sort"
					value={sortKey}
					onChange={(e) =>
						onSortByChange(e.target.value as SortValue)
					}
				>
					<option value="name_asc">Nom (A → Z)</option>
					<option value="name_desc">Nom (Z → A)</option>
					<option value="feast_asc">Fête (croissant)</option>
					<option value="feast_desc">Fête (décroissant)</option>
				</select>
			</div>
		</form>
	);
};

export { SaintsFilters };
