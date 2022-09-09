import React, { useCallback } from 'react';

import Tree from '../Tree';
import './aside.scss';

const Aside = () => {
	return (
		<aside className="aside">
			<div className="aside-wrapper">
				<h1>categories</h1>
				<nav className="aside__nav">
					<Tree isAdmin={true} />
				</nav>
			</div>
		</aside>
	);
};

export default Aside;
