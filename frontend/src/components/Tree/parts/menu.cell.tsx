import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import appManager from 'src/utils/app.manager';
import { ICell } from 'src/utils/treeBuilder';

interface ICellProps {
	cell: ICell;
}

const Cell: React.FC<ICellProps> = ({ cell }) => {
	const navigate = useNavigate();
	const haveChilds = cell._next.length > 0;
	const [renderSub, setRenderSub] = useState<boolean>(false);

	useEffect(() => {
		if (renderSub !== cell._isOpen) {
			setRenderSub(cell._isOpen);
		}
	}, [cell, renderSub, setRenderSub]);

	const handleClick = () => {
		appManager.selectCategoryId = cell._currentCategory?._id || '';
		navigate(`/category/${cell._currentCategory!._id}/${appManager.resourceType}`);
	};

	const renderChilds = useCallback(() => {
		if (cell._next.length > 0) {
			return cell._next.map((el, index) => (
				<Cell key={`${el._currentCategory?._id}-${index}`} cell={el}></Cell>
			));
		}
	}, [cell]);

	const handleb = useCallback(() => {
		setRenderSub(prev => !prev);
		cell._isOpen = !cell._isOpen;
	}, [cell]);

	const renderIconOpenSub = useCallback(() => {
		if (haveChilds) {
			return (
				<button className="cell__btn--childs" onClick={handleb}>
					{cell._isOpen ? '-' : '+'}
				</button>
			);
		}
	}, [cell._isOpen, haveChilds, handleb]);

	return (
		<div className="cell btn__header ">
			<div className="cell-wrapper">
				<div className="cell__body" onClick={handleClick}>
					{renderIconOpenSub()}
					<NavLink
						to={`/category/${cell._currentCategory?._id}/${appManager.resourceType}`}
						className=""
					>
						{cell._currentCategory?.name}
					</NavLink>
				</div>
			</div>
			{renderSub && renderChilds()}
		</div>
	);
};

export default Cell;
