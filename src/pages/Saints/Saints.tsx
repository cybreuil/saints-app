import React, { useState } from "react";
import { Link } from "react-router-dom";
import saintsData from "../../data/saints.json";
import "./Saints.css";

interface Saint {
	id: string;
	name: string;
	description: string;
	bio: string;
	extra?: {
		rank?: string;
		icon?: string;
	};
}

const Saints: React.FC = () => {
	const [selectedCalendar, setSelectedCalendar] = useState<string>("tridentine_1960");
	const [searchQuery, setSearchQuery] = useState<string>("");

	// Get all saints from the selected calendar
	const getAllSaints = () => {
		const calendar = saintsData.calendars[selectedCalendar as keyof typeof saintsData.calendars];
		if (!calendar || !calendar.saints) return [];

		const allSaints: Array<{ date: string; saint: Saint }> = [];
		Object.entries(calendar.saints).forEach(([date, saints]) => {
			saints.forEach((saint) => {
				allSaints.push({ date, saint });
			});
		});
		return allSaints;
	};

	const saints = getAllSaints();

	// Filter saints based on search query
	const filteredSaints = saints.filter(({ saint }) =>
		saint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		saint.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const calendarInfo = saintsData.calendars[selectedCalendar as keyof typeof saintsData.calendars];

	return (
		<div className="saints-page">
			<div className="container">
				<div className="breadcrumb">
					<Link to="/">Home</Link>
					<span className="breadcrumb-separator">›</span>
					<span>Browse Saints</span>
				</div>

				<header className="page-header">
					<h1 className="page-title">Saints Calendar</h1>
					<p className="page-description">
						Explore the lives of Catholic saints throughout the liturgical year
					</p>
				</header>

				<div className="controls-section">
					<div className="calendar-selector">
						<label htmlFor="calendar-select" className="selector-label">
							Select Calendar:
						</label>
						<select
							id="calendar-select"
							className="calendar-select"
							value={selectedCalendar}
							onChange={(e) => setSelectedCalendar(e.target.value)}
						>
							<option value="tridentine_1960">Roman Calendar 1960 (Traditional)</option>
							<option value="roman_1970">Roman Calendar 1970 (Vatican II)</option>
							<option value="bonus">Bonus Saints</option>
						</select>
					</div>

					<div className="search-box">
						<input
							type="text"
							placeholder="Search saints by name..."
							className="search-input"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<span className="search-icon">🔍</span>
					</div>
				</div>

				<div className="calendar-info card">
					<h3 className="calendar-title">{calendarInfo.name}</h3>
					<p className="calendar-description">{calendarInfo.description}</p>
				</div>

				<div className="saints-stats">
					<div className="stat-card">
						<div className="stat-number">{filteredSaints.length}</div>
						<div className="stat-label">Saints Found</div>
					</div>
					<div className="stat-card">
						<div className="stat-number">{Object.keys(calendarInfo.saints).length}</div>
						<div className="stat-label">Feast Days</div>
					</div>
				</div>

				<div className="saints-grid">
					{filteredSaints.length === 0 ? (
						<div className="no-results">
							<p>No saints found matching your search.</p>
						</div>
					) : (
						filteredSaints.map(({ date, saint }, index) => (
							<div key={`${saint.id}-${index}`} className="saint-card card">
								<div className="saint-card-header">
									<span className="saint-date">{date.replace("-", "/")}</span>
									{saint.extra?.rank && (
										<span className="saint-rank">{saint.extra.rank}</span>
									)}
								</div>
								<h3 className="saint-card-name">{saint.name}</h3>
								<p className="saint-card-description">{saint.description}</p>
								<div className="saint-card-footer">
									<span className="learn-more">Learn more →</span>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Saints;
