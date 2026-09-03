import { useEffect, useRef } from "react";
import { useRandomImages } from "../../hooks/useImages";
import "./ArtworkCarousel.css";

function ArtworkCarousel() {
	const { images, loading, error } = useRandomImages(10);

	const trackRef = useRef<HTMLDivElement>(null);

	const carouselImages = [...images, ...images];

	useEffect(() => {
		const track = trackRef.current;

		if (!track || images.length === 0) return;

		let animationFrame = 0;
		let position = 0;

		const speed = 0.5;

		const animate = () => {
			position += speed;

			const halfWidth = track.scrollWidth / 2;

			if (position >= halfWidth) {
				position = 0;
			}

			track.style.transform = `translate3d(-${position}px, 0, 0)`;

			animationFrame = requestAnimationFrame(animate);
		};

		animationFrame = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrame);
	}, [images]);

	if (loading) {
		return (
			<section className="saint-carousel saint-carousel--loading">
				<div className="saint-carousel__loading">
					<span className="saint-carousel__spinner" />
					<span>Chargement des saints...</span>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="saint-carousel saint-carousel--error">
				<p className="saint-carousel__error">
					Impossible de charger les images.
				</p>
			</section>
		);
	}

	if (!images.length) {
		return null;
	}

	return (
		<section className="saint-carousel">
			<div className="saint-carousel__fade saint-carousel__fade--left" />
			<div className="saint-carousel__fade saint-carousel__fade--right" />

			<div ref={trackRef} className="saint-carousel__track">
				{carouselImages.map((image, index) => (
					<div
						className="saint-carousel__item"
						key={`${image.id}-${index}`}
					>
						<img
							src={image.image_url}
							alt={image.alt_text || image.title || "Saint"}
							className="saint-carousel__image"
							draggable="false"
						/>
					</div>
				))}
			</div>
		</section>
	);
}

export { ArtworkCarousel };
