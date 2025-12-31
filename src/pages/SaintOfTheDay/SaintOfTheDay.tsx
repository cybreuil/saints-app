import React from "react";
import { Link } from "react-router-dom";
import "./SaintOfTheDay.css";

// Example static data (to be replaced with dynamic fetching if needed)
const saintOfTheDay = {
	name: "Saint Sylvester I",
	date: new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}),
	feastDay: "December 31",
	description:
		"Saint Sylvester I was the 33rd Pope of the Catholic Church, serving from 314 to 335 AD. His pontificate coincided with the reign of Constantine the Great and the end of Christian persecution. He is venerated as a saint in both the Catholic Church and the Eastern Orthodox Church.",
	biography: [
		"Pope Sylvester I presided over the Church during a pivotal moment in Christian history. When Constantine the Great ended the persecution of Christians and granted freedom of worship, Sylvester guided the Church through this transformative period.",
		"According to tradition, he baptized Emperor Constantine, though historical evidence suggests the emperor was baptized later by Eusebius of Nicomedia. Nevertheless, Sylvester's influence on Constantine and the early Christian church was profound.",
		"During his papacy, the great basilicas of St. Peter and St. John Lateran were built in Rome. He also presided during the First Council of Nicaea in 325 AD, though he sent legates rather than attending himself.",
	],
	attributes: [
		"Papal vestments",
		"Tiara",
		"Often shown with a bull or dragon",
	],
	patronage: [
		"Patron of stonemasons",
		"Invoked against the plague",
	],
	image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Pope_Sylvester_I.jpg/300px-Pope_Sylvester_I.jpg",
};

const SaintOfTheDay: React.FC = () => {
	return (
		<div className="saint-of-the-day-page">
			<div className="container-md">
				<div className="breadcrumb">
					<Link to="/">Home</Link>
					<span className="breadcrumb-separator">›</span>
					<span>Saint of the Day</span>
				</div>

				<article className="saint-article">
					<header className="saint-header">
						<div className="saint-date-badge">{saintOfTheDay.feastDay}</div>
						<h1 className="saint-name">{saintOfTheDay.name}</h1>
						<p className="saint-subtitle">{saintOfTheDay.date}</p>
					</header>

					<div className="saint-content">
						<div className="saint-image-container">
							<img
								src={saintOfTheDay.image}
								alt={saintOfTheDay.name}
								className="saint-image"
							/>
							<div className="saint-meta">
								<div className="meta-section">
									<h3 className="meta-title">Attributes</h3>
									<ul className="meta-list">
										{saintOfTheDay.attributes.map((attr, index) => (
											<li key={index}>{attr}</li>
										))}
									</ul>
								</div>
								<div className="meta-section">
									<h3 className="meta-title">Patronage</h3>
									<ul className="meta-list">
										{saintOfTheDay.patronage.map((patron, index) => (
											<li key={index}>{patron}</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						<div className="saint-text">
							<section className="saint-description">
								<h2 className="section-heading">About</h2>
								<p className="lead-paragraph">{saintOfTheDay.description}</p>
							</section>

							<section className="saint-biography">
								<h2 className="section-heading">Life & Legacy</h2>
								{saintOfTheDay.biography.map((paragraph, index) => (
									<p key={index} className="biography-paragraph">
										{paragraph}
									</p>
								))}
							</section>
						</div>
					</div>

					<footer className="saint-footer">
						<Link to="/saints" className="button button-primary">
							Browse All Saints
						</Link>
						<Link to="/" className="button button-outline">
							Back to Home
						</Link>
					</footer>
				</article>
			</div>
		</div>
	);
};

export { SaintOfTheDay };
