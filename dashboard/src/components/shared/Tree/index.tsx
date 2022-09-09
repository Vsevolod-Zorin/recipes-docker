import React, { useCallback } from 'react';
import Cell from 'src/components/Aside/parts/menu.cell';
import { ICell } from 'src/helpers/treeBuilder';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import './tree.scss';

interface ITreeProps {
	onClick?: (el: ICell) => void;
}

const Tree: React.FC<ITreeProps> = ({ onClick }) => {
	const { data } = useFetchAllCategoriesQuery({});

	const renderTree = useCallback(() => {
		return data?.cellsList.map((el, index) => (
			<Cell key={el._currentCategory!._id + index} cell={el} onClick={onClick} />
		));
	}, [data, onClick]);
	return <div className="tree">{renderTree()}</div>;
};

export default Tree;
