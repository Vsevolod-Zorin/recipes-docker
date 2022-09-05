import React from 'react';
import Aside from '../Aside';
import './main.scss';

const Main = () => {
	return (
		<main className="main">
			<div className="main__left-part">
				<Aside />
			</div>
			<div className="main__right-part">main</div>
		</main>
	);
};

export default Main;
