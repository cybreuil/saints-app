import "./AdditionalCelebrations.css";
import type { Celebration } from "../../types/Celebration";

type AdditionalCelebrationsProps = {
	secondaryCelebrations: Celebration[] | null;
	isLoading: boolean;
	error: Error | null;
};


// A renommer en celebrations empechées ?? secondary additional alternative etc; need to choose
const AdditionalCelebrations = ({
	secondaryCelebrations,
	isLoading,
	error,
}: AdditionalCelebrationsProps) => {
	return (
		<div className="additional-celebrations-container">
			{isLoading ? (
				<p>Loading additional celebrations...</p>
			) : error ? (
				<p>Error loading additional celebrations: {error.message}</p>
			) : secondaryCelebrations && secondaryCelebrations.length > 0 ? (
				<div className="additional-celebrations">
					<h3>Additional Celebrations</h3>
					<ul>
						{secondaryCelebrations.map((celebration) => (
							<li key={celebration.id}>
								{celebration.feast_name}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="no-additional-celebrations">
					<p>No additional celebrations for this date.</p>
				</div>
			)}
		</div>
	);
};

export { AdditionalCelebrations };
