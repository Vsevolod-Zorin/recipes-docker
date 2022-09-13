import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import appManager from 'src/helpers/app.manager';

import { ICell } from 'src/helpers/treeBuilder';

interface ICellProps {
	cell: ICell;
	isAdmin: boolean;
	handleClickEdit: (cell: ICell) => void;
	handleClickDelete: (cell: ICell) => void;
}

const Cell: React.FC<ICellProps> = ({ isAdmin, cell, handleClickEdit, handleClickDelete }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const haveChilds = cell._next.length > 0;

	const handleClick = () => {
		appManager.selectCategoryId = cell._currentCategory?._id || '';
		navigate(`/category/${cell._currentCategory!._id}/${appManager.resourceType}`);
	};

	const renderChilds = useCallback(() => {
		if (cell._next.length > 0) {
			return cell._next.map((el, index) => (
				<Cell
					key={`${el._currentCategory?._id}-${index}`}
					cell={el}
					handleClickEdit={() => handleClickEdit(el)}
					handleClickDelete={() => handleClickDelete(el)}
					isAdmin={isAdmin}
				></Cell>
			));
		}
	}, [cell, isAdmin]);

	const renderIconOpenSub = useCallback(() => {
		if (haveChilds) {
			return (
				<button className="cell__btm--childs" onClick={() => setIsOpen(prev => !prev)}>
					{isOpen ? '-' : '+'}
				</button>
			);
		}
	}, [isOpen, haveChilds]);

	const renderAdminBtns = useCallback(() => {
		if (isAdmin) {
			return (
				<div className="cell__admin">
					<button className="cell__btn--edit" onClick={() => handleClickEdit(cell)}>
						edit
					</button>
					<button className="cell__btn--edit" onClick={() => handleClickDelete(cell)}>
						del
					</button>
				</div>
			);
		}
	}, [isAdmin]);

	return (
		<div className="cell ">
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
				{renderAdminBtns()}
			</div>
			{isOpen && renderChilds()}
		</div>
	);
};

export default Cell;
