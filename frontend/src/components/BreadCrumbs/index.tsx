import React, { useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import logger from 'redux-logger';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import appManager from 'src/utils/app.manager';
import './breadcrumbs.scss';

interface IBreadcrumbsProps {}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = () => {
	const { data } = useFetchAllCategoriesQuery({});
	const { categoryId } = useParams();

	const cell = useMemo(() => {
		if (data && categoryId) {
			return data?.cellsList.find(el => el!._currentCategory!._id === categoryId);
		}
	}, [data, categoryId]);

	const renderBreadcrumbs = useCallback(() => {
		if (cell) {
			const arr = cell.initBreadcrumbs!();
			
			return arr.map((el, index) => (
				<li className="breadcrumbs__list--element btn__header" key={'br' + el._currentCategory!._id}>
					<NavLink to={`/category/${el._currentCategory!._id}/${appManager.resourceType}`}>
						{el._currentCategory!.name}
					</NavLink>
				</li>
			));
		}
	}, [cell]);

	return (
		<div className="breadcrumbs breadcrumbs-wrapper">
			<ul className="breadcrumbs__list">{renderBreadcrumbs()}</ul>
		</div>
	);
};

export default Breadcrumbs;
