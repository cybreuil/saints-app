import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About: React.FC = () => {
	return (
		<div className="about-page">
			<div className="container-md">
				<div className="breadcrumb">
					<Link to="/">Home</Link>
					<span className="breadcrumb-separator">›</span>
					<span>About</span>
				</div>

				<header className="about-header">
					<h1 className="about-title">About Saints App</h1>
					<p className="about-subtitle">
						Connecting faith and history through the lives of Catholic saints
					</p>
				</header>

				<article className="about-content">
					<section className="about-section card">
						<h2 className="section-title">Our Mission</h2>
						<p className="section-text">
							Saints App is dedicated to making the rich heritage of Catholic saints accessible
							to everyone. We believe that the lives of these holy men and women offer timeless
							wisdom, inspiration, and guidance for people of all backgrounds and walks of life.
						</p>
						<p className="section-text">
							Through this application, we aim to provide an intuitive and beautiful way to
							explore the liturgical calendar, discover daily saints, and learn about the
							remarkable individuals who have shaped Catholic tradition throughout the centuries.
						</p>
					</section>

					<section className="about-section card">
						<h2 className="section-title">Features</h2>
						<div className="features-list">
							<div className="feature-item">
								<div className="feature-icon">📖</div>
								<div className="feature-content">
									<h3 className="feature-heading">Comprehensive Database</h3>
									<p className="feature-description">
										Access information about hundreds of saints from both the Traditional
										Roman Calendar (1960) and the Post-Vatican II Calendar (1970).
									</p>
								</div>
							</div>

							<div className="feature-item">
								<div className="feature-icon">📅</div>
								<div className="feature-content">
									<h3 className="feature-heading">Daily Saint</h3>
									<p className="feature-description">
										Discover a new saint each day with detailed biographies, feast days,
										attributes, and patronages.
									</p>
								</div>
							</div>

							<div className="feature-item">
								<div className="feature-icon">🔍</div>
								<div className="feature-content">
									<h3 className="feature-heading">Easy Search</h3>
									<p className="feature-description">
										Quickly find saints by name, feast day, or browse through different
										liturgical calendars.
									</p>
								</div>
							</div>

							<div className="feature-item">
								<div className="feature-icon">🎨</div>
								<div className="feature-content">
									<h3 className="feature-heading">Beautiful Design</h3>
									<p className="feature-description">
										Enjoy a clean, modern interface with professional typography and a
										reverent aesthetic that honors the subject matter.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className="about-section card">
						<h2 className="section-title">About the Liturgical Calendars</h2>
						<div className="calendar-info-grid">
							<div className="calendar-info-item">
								<h3 className="calendar-heading">Roman Calendar 1960</h3>
								<p className="calendar-text">
									The Traditional Roman Calendar as established under Pope John XXIII,
									following the ancient traditions of the Latin Church. This calendar
									maintains many feast days and rankings from centuries of Catholic tradition.
								</p>
							</div>

							<div className="calendar-info-item">
								<h3 className="calendar-heading">Roman Calendar 1970</h3>
								<p className="calendar-text">
									The reformed liturgical calendar established by Pope Paul VI following
									the Second Vatican Council. This calendar simplified rankings, updated
									some feast days, and reflected modern historical scholarship.
								</p>
							</div>
						</div>
					</section>

					<section className="about-section card cta-section">
						<h2 className="section-title">Start Your Journey</h2>
						<p className="section-text center">
							Whether you're deepening your faith, researching Catholic history, or simply
							curious about the lives of remarkable individuals, Saints App is here to guide you.
						</p>
						<div className="cta-buttons">
							<Link to="/saint-of-the-day" className="button button-primary">
								View Today's Saint
							</Link>
							<Link to="/saints" className="button button-outline">
								Browse All Saints
							</Link>
						</div>
					</section>
				</article>
			</div>
		</div>
	);
};

export default About;
