import React, { useEffect, useState, useCallback } from 'react';
import { ICell } from 'src/helpers/treeBuilder';

interface ICellProps {
	cell: ICell;
}

const Cell: React.FC<ICellProps> = ({ cell }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {}, [cell]);

	const checkChilds = useCallback(() => {}, []);

	const renderChilds = useCallback(() => {
		if (cell._next.length > 0) {
			return cell._next.map((el, index) => (
				<Cell key={`${el._currentCategory?._id}-${index}`} cell={el}></Cell>
				// <div key={'sub1-' + index}>
				// 	name: {el._currentCategory?.name}
				// 	<div>parentId: {el._currentCategory?.parentId}</div>
				// </div>
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
