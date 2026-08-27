import "./SecondaryCelebrations.css";
import type { Celebration } from "../../types/Celebration";
import { Loader } from "../Loader/Loader";

type SecondaryCelebrationsProps = {
	secondaryCelebrations: Celebration[] | null;
	isLoading: boolean;
	celebrationError: Error | null;
	calendarError: Error | null;
	liturgicalSeasonColor: string | null;
};


// A renommer en celebrations empechées ?? secondary additional alternative etc; need to choose
const SecondaryCelebrations = ({
	secondaryCelebrations,
	isLoading,
	celebrationError,
	calendarError,
	liturgicalSeasonColor,
}: SecondaryCelebrationsProps) => {

	return (
		<div className="secondary-celebrations-container">
			{isLoading ? (
				<Loader />
			): calendarError ? (
				<p className="secondary-celebrations-error">Error loading calendar: {calendarError.message}</p>
			) : celebrationError ? (
				<p className="secondary-celebrations-error">Error loading additional celebrations: {celebrationError.message}</p>
			) : secondaryCelebrations && secondaryCelebrations.length > 0 ? (
				<div className="secondary-celebrations">
					<h3>Other Celebrations</h3>
					<ul>
					{secondaryCelebrations.map((celebration) => (

							<li key={celebration.id}>
								<span
									style={{
										display: "inline-block",
										width: "8px",
										height: "8px",
										borderRadius: "50%",
										backgroundColor:
													celebration.liturgical_color_hex ||
													liturgicalSeasonColor ||
													"#111111",
										border: "1px solid #111111",
										marginRight: "8px",
									}}
								/>
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
