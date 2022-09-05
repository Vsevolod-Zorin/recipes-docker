import React from 'react';
import { NavLink } from 'react-router-dom';
import './aside.scss';

const Aside = () => {
	return (
		<aside className="aside">
			<div className="aside-wrapper">
				<div>categories</div>
				<nav className="aside__nav">
					<ul>
						<li>
							<NavLink to="/">category 1</NavLink>
						</li>
						<li>
							<NavLink to="/qr">category 2</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Aside;
