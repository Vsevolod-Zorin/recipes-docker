import React from 'react';
import Loader from '../Loader';
import './footer.scss';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-wrapper content">
				<p>footer</p>
				<Loader />
			</div>
		</footer>
	);
};

export default Footer;
