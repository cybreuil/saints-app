import "./Loader.css";

interface LoaderProps {
	// Size / color / etc...
	size?: number;
}

const Loader = ({ size = 80 }: LoaderProps) => {
	return (
		<div className="loader-container">
			<div className={`lds-ripple`} style={{ width: size, height: size }}>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export { Loader };
