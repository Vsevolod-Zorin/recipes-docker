import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Main from 'src/components/Main';
import Pace from 'src/components/Pace';
import './layout.scss';

const Layout = () => {
	return (
		<div className="layout">
			<Header />
			<Pace color="red" />
			<Main />
			<Footer />
		</div>
	);
};

export default Layout;
