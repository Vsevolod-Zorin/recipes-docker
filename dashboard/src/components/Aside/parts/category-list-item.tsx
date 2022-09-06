import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICategory } from 'src/types/category/category.interface';

interface ICategoryListItem {
	category: ICategory;
}

const CategoryListItem: React.FC<ICategoryListItem> = ({ category }) => {
	return (
		<div className="list__item--wrapper">
			<NavLink to={`category/${category._id}`}>{category.name}</NavLink>
		</div>
	);
};

export default CategoryListItem;
