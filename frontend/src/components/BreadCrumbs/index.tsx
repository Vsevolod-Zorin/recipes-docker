import React from 'react';
import { ICell } from 'src/utils/treeBuilder';
import './breadcrumbs.scss';

interface IBreadcrumbsProps {
	cell: ICell;
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ cell }) => {
	const renderBreadcrumbs = () => {
		const arr = cell.initBreadcrumbs!();

		return arr.map((el, index) => (
			<li className="breadcrumbs__list--element" key={'br' + index}>
				{el._currentCategory?.name}
			</li>
		));
	};

	return (
		<div className="breadcrumbs breadcrumbs-wrapper">
			<ul className="breadcrumbs__list">{renderBreadcrumbs()}</ul>
		</div>
	);
};

export default Breadcrumbs;
