import "./SecondaryCelebrations.css";
import type { Celebration } from "../../types/Celebration";
import { Loader } from "../Loader/Loader";

type SecondaryCelebrationsProps = {
	secondaryCelebrations: Celebration[] | null;
	isLoading: boolean;
	error: Error | null;
};


// A renommer en celebrations empechées ?? secondary additional alternative etc; need to choose
const SecondaryCelebrations = ({
	secondaryCelebrations,
	isLoading,
	error,
}: SecondaryCelebrationsProps) => {
	return (
		<div className="secondary-celebrations-container">
			{isLoading ? (
				<Loader/>
			) : error ? (
				<p className="secondary-celebrations-error">Error loading additional celebrations: {error.message}</p>
			) : secondaryCelebrations && secondaryCelebrations.length > 0 ? (
				<div className="secondary-celebrations">
					<h3>Other Celebrations</h3>
					<ul>
						{secondaryCelebrations.map((celebration) => (
							<li key={celebration.id}>
								{celebration.feast_name}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="no-secondary-celebrations">
					<p>No other celebrations for this date.</p>
				</div>
			)}
		</div>
	);
};

export { SecondaryCelebrations };
