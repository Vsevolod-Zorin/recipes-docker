import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { ICategory } from 'src/types/category/category.interface';
import appManager from 'src/helpers/app.manager';
import CategoryListItem from './parts/category-list-item';
import './aside.scss';

const Aside = () => {
	let navigate = useNavigate();

	const { data } = useFetchAllCategoriesQuery({});
	useEffect(() => {}, []);

	const handleClick = useCallback(
		(el: ICategory) => {
			// todo routes constants
			appManager.selectCategoryId = el._id;
			navigate(`/category/${el._id}/${appManager.resourceType}`);
		},
		[navigate]
	);

	const renderCategories = useCallback(() => {
		return data?.map((el, index) => (
			<li key={`aside-item-${index}`} onClick={() => handleClick(el)}>
				<CategoryListItem category={el} />
			</li>
		));
	}, [data]);

	return (
		<aside className="aside">
			<div className="aside-wrapper">
				<h1>categories</h1>
				<nav className="aside__nav">
					<ul>{renderCategories()}</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Aside;
