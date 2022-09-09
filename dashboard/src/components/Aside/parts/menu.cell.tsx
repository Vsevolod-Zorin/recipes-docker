import React, { useState, useCallback } from 'react';
import { ICell } from 'src/helpers/treeBuilder';

interface ICellProps {
	cell: ICell;
	onClick?: (el: ICell) => void;
}

const Cell: React.FC<ICellProps> = ({ cell, onClick }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = () => {
		onClick && onClick(cell);
	};

	const renderChilds = useCallback(() => {
		if (cell._next.length > 0) {
			return cell._next.map((el, index) => (
				<Cell key={`${el._currentCategory?._id}-${index}`} cell={el} onClick={onClick}></Cell>
			));
		}
	}, [cell]);

	return (
		<div className="cell cell-wrapper">
			<button onClick={() => setIsOpen(prev => !prev)}>{isOpen ? '-' : '+'}</button>
			<div onClick={handleClick}>{cell._currentCategory?.name}</div>
			{isOpen && renderChilds()}
		</div>
	);
};

export default Cell;
