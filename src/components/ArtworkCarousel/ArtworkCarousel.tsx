import { useRandomImages } from "../../hooks/useImages";

function ArtworkCarousel() {
	const { images } = useRandomImages(10);

	// if (loading) {
	// 	return <CarouselSkeleton />;
	// }

	// if (error) {
	// 	return null;
	// }

	// return <Carousel images={images} />;
	//
	return (
		<div className="artwork-carousel">
			{images.map((image) => (
				<img key={image.id} src={image.image_url} alt="" />
			))}
		</div>
	);
}

export { ArtworkCarousel };
