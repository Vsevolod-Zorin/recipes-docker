import React from 'react';
import { CustomRouter } from 'src/routes';
import Aside from 'src/components/Aside';
import Breadcrumbs from 'src/components/BreadCrumbs';
import './main.scss';

const Main = () => {
	return (
		<main className="main custom-scroll">
			<div className="main-wrapper content ">
				<section className="main__left-part custom-scroll">
					<Aside />
				</section>
				<section className="main__right-part custom-scroll">
					{/* <Breadcrumbs /> */}
					<div className="router-wrapper">
						<CustomRouter />
					</div>
				</section>
			</div>
		</main>
	);
};

export default Main;
