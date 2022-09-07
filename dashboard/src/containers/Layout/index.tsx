import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Main from 'src/components/Main';
import './layout.scss';

const Layout = () => {
	return (
		<div className="layout">
			<Header />
			<Main />
			<Footer />
		</div>
	);
};

export default Layout;
