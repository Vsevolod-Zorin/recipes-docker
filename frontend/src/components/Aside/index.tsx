import React, { useCallback, useEffect } from 'react';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import CategoryListItem from './parts/category-list-item';
import './aside.scss';

const Aside = () => {
	// todo: change
	const { data } = useFetchAllCategoriesQuery({});
	useEffect(() => {}, []);

	const renderCategories = useCallback(() => {
		return data?.map((el, index) => (
			<li key={`aside-item-${index}`}>
				<CategoryListItem category={el} />
			</li>
		));
	}, [data]);

	return (
		<aside className="aside">
			<div className="aside-wrapper">
				<div>categories</div>
				<nav className="aside__nav">
					<ul>{renderCategories()}</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Aside;
