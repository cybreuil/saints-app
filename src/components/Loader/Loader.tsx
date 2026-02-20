import "./Loader.css";

interface LoaderProps {
	// Size / color / etc...
	size?: number;
}

const Loader = ({ size = 80 }: LoaderProps) => {
	const borderWidth = `${size * 0.05}px`; // 5% of the size for the border width

	return (
		<div className="loader-container">
			<div className={`lds-ripple`} style={{ width: size, height: size }}>
				<div style={{ borderWidth }}></div>
				<div style={{ borderWidth }}></div>
			</div>
		</div>
	);
};

export { Loader };
