import React, { useCallback } from 'react';
import Cell from 'src/components/Tree/parts/menu.cell';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import './tree.scss';

interface ITreeProps {
	isAdmin: boolean;
}

const Tree: React.FC<ITreeProps> = ({ isAdmin }) => {
	const { data } = useFetchAllCategoriesQuery({});

	const renderTree = useCallback(() => {
		return data?.cellsList.map((el, index) => (
			<Cell key={el._currentCategory!._id + index} cell={el} isAdmin={isAdmin} />
		));
	}, [data]);
	return <div className="tree">{renderTree()}</div>;
};

export default Tree;
