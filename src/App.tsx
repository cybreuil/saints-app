import "./App.css";
import { Link } from "react-router-dom";

function App() {
	return (
		<div className="home-page">
			<div className="hero-section">
				<img src="/logo.svg" alt="Saints App Logo" className="hero-logo" />
				<h1 className="hero-title">Welcome to Saints App</h1>
				<p className="hero-subtitle">
					Discover the lives and legacies of Catholic saints throughout history
				</p>
				<div className="hero-actions">
					<Link className="button button-primary" to="/saint-of-the-day">
						Saint of the Day
					</Link>
					<Link className="button button-outline" to="/saints">
						Browse All Saints
					</Link>
				</div>
			</div>

			<div className="features-section container">
				<h2 className="section-title">Explore Sacred Lives</h2>
				<div className="features-grid">
					<div className="feature-card card">
						<div className="feature-icon">📅</div>
						<h3>Daily Saint</h3>
						<p>
							Learn about a different saint each day and discover their unique contributions to faith and humanity.
						</p>
						<Link to="/saint-of-the-day" className="feature-link">
							View Today's Saint →
						</Link>
					</div>

					<div className="feature-card card">
						<div className="feature-icon">📖</div>
						<h3>Saints Calendar</h3>
						<p>
							Browse the complete calendar of saints from both the Traditional Roman and Post-Vatican II calendars.
						</p>
						<Link to="/saints" className="feature-link">
							Browse Calendar →
						</Link>
					</div>

					<div className="feature-card card">
						<div className="feature-icon">🕊️</div>
						<h3>Rich Histories</h3>
						<p>
							Explore detailed biographies, feast days, and the spiritual significance of Catholic saints.
						</p>
						<Link to="/about" className="feature-link">
							Learn More →
						</Link>
					</div>
				</div>
			</div>

			<div className="cta-section">
				<div className="container">
					<h2 className="cta-title">Begin Your Journey</h2>
					<p className="cta-text">
						Deepen your faith by learning about the saints who have inspired millions throughout the ages.
					</p>
					<Link to="/saint-of-the-day" className="button button-secondary">
						Start Exploring
					</Link>
				</div>
			</div>
		</div>
	);
}

export { App };
