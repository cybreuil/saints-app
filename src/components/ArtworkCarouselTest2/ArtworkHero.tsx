import { useEffect, useState } from "react";
import { useRandomImages } from "../../hooks/useImages";
import "./ArtworkHero.css";

function ArtworkHero() {
	const { images, loading, error } = useRandomImages(10);

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (images.length === 0) return;

		const interval = setInterval(() => {
			setActiveIndex((current) => (current + 1) % images.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [images.length]);

	if (loading) {
		return (
			<section className="artwork-hero artwork-hero--loading">
				<div className="artwork-hero__loader" />
			</section>
		);
	}

	if (error) {
		return (
			<section className="artwork-hero artwork-hero--error">
				<p>Impossible de charger les artworks.</p>
			</section>
		);
	}

	if (!images.length) return null;

	return (
		<section className="artwork-hero">
			<div className="artwork-hero__background">
				{images.map((image, index) => (
					<div
						key={image.id}
						className={`artwork-hero__artwork ${
							index === activeIndex
								? "artwork-hero__artwork--active"
								: ""
						}`}
					>
						<img src={image.image_url} alt="" draggable="false" />
					</div>
				))}
			</div>

			<div className="artwork-hero__overlay" />

			<div className="artwork-hero__content">
				<span className="artwork-hero__eyebrow">
					Découvrez notre collection
				</span>

				<h1>Les Saints</h1>

				<p>
					Explorez les vies, les histoires et les œuvres consacrées
					aux saints à travers les siècles.
				</p>

				<button className="artwork-hero__button">Découvrir</button>
			</div>

			<div className="artwork-hero__scroll">
				<span>Scroll</span>
				<span className="artwork-hero__scroll-line" />
			</div>
		</section>
	);
}

export { ArtworkHero };
