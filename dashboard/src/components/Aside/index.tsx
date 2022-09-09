import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';

import Tree from '../shared/Tree';
import './aside.scss';
import { useAppDispatch } from 'src/hooks/redux';
import { ICell } from 'src/helpers/treeBuilder';
import { categoryActions } from 'src/store/reducers/category.slice';

const Aside = () => {
	const dispatch = useAppDispatch();

	const handleClick = (el: ICell) => {
		dispatch(categoryActions.setSelectedCell(el));
	};

	return (
		<aside className="aside">
			<div className="aside-wrapper">
				<h1>categories</h1>
				<nav className="aside__nav">
					<Tree onClick={handleClick} />
				</nav>
			</div>
		</aside>
	);
};

export default Aside;
