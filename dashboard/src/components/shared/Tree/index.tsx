import React, { useEffect, useCallback } from 'react';
import Cell from 'src/components/Aside/parts/menu.cell';
import { TreeManager } from 'src/helpers/treeBuilder';
import { ICategory } from 'src/types/category/category.interface';
import './tree.scss';

interface ITreeProps {
	categories: ICategory[];
}

const Tree: React.FC<ITreeProps> = ({ categories }) => {
	useEffect(() => {}, [categories]);

	const renderTree = useCallback(() => {
		const treeManager = new TreeManager(categories);
		treeManager.init();
		const sortedCellsList = treeManager.sortedCellsList;

		return sortedCellsList.map((el, index) => (
			<Cell key={el._currentCategory!._id + index} cell={el} />
		));
	}, [categories]);
	return <div className="tree">{renderTree()}</div>;
};

export default Tree;
