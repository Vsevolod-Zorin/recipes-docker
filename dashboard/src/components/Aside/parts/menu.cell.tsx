import React, { useState, useCallback } from 'react';
import { ICell } from 'src/helpers/treeBuilder';

interface ICellProps {
	cell: ICell;
}

const Cell: React.FC<ICellProps> = ({ cell }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const renderChilds = useCallback(() => {
		if (cell._next.length > 0) {
			return cell._next.map((el, index) => (
				<Cell key={`${el._currentCategory?._id}-${index}`} cell={el}></Cell>
			));
		}
	}, [cell]);

	return (
		<div className="cell cell-wrapper">
			<button onClick={() => setIsOpen(prev => !prev)}>{isOpen ? '-' : '+'}</button>
			{cell._currentCategory?.name}
			{isOpen && renderChilds()}
		</div>
	);
};

export default Cell;
