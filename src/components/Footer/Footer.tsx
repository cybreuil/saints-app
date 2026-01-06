import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<p>© {new Date().getFullYear()} Saints-App. All rights reserved.</p>
			<p className="footer-credit">
				<a
					href="github.com/cybreuil"
					target="_blank"
					rel="noopener noreferrer"
				>
					Github
				</a>
			</p>
		</footer>
	);
};

export { Footer };
