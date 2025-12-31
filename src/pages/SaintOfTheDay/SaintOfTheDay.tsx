import { Link } from "react-router-dom";
import saintsData from "../../data/saints.json";
import "./SaintOfTheDay.css";

interface Saint {
	id: string;
	name: string;
	description: string;
	bio: string;
	extra: {
		rank?: string;
		icon?: string;
	};
}

interface Calendar {
	name: string;
	description: string;
	saints: Record<string, Saint[]>;
}

function SaintOfTheDay() {
	// Get today's date in MM-DD format
	const today = new Date();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	const dateKey = `${month}-${day}`;

	// Get saints for today from all calendars
	const todaysSaints: Saint[] = [];
	const calendars = saintsData.calendars as Record<string, Calendar>;

	Object.values(calendars).forEach((calendar) => {
		const saintsForDate = calendar.saints[dateKey];
		if (saintsForDate) {
			todaysSaints.push(...saintsForDate);
		}
	});

	return (
		<div className="saint-of-the-day">
			<h1>Saint of the Day</h1>
			<p className="date">
				{today.toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</p>

			{todaysSaints.length > 0 ? (
				<div className="saints-list">
					{todaysSaints.map((saint) => (
						<div key={saint.id} className="saint-card">
							<h2>{saint.name}</h2>
							<p className="description">{saint.description}</p>
							<p className="bio">{saint.bio}</p>
							{saint.extra.rank && (
								<p className="rank">
									<strong>Rank:</strong> {saint.extra.rank}
								</p>
							)}
						</div>
					))}
				</div>
			) : (
				<p>No saints found for today.</p>
			)}

			<Link to="/" className="back-link">
				← Back to Home
			</Link>
		</div>
	);
}

export { SaintOfTheDay };
