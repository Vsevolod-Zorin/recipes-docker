import React, { useEffect, useCallback } from 'react';
import Cell from 'src/components/Tree/parts/menu.cell';
import { openParentCells } from 'src/utils/open-parent-cells';
import { useAppSelector } from 'src/hooks/redux';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { selectCategoryId } from 'src/store/selectors';
import './tree.scss';

interface ITreeProps {}

const Tree: React.FC<ITreeProps> = ({}) => {
	const { data } = useFetchAllCategoriesQuery({});
	const categoryId = useAppSelector(selectCategoryId);

	useEffect(() => {
		if (categoryId && data?.cellsList) {
			openParentCells(categoryId, data?.cellsList);
		}
	}, [data, categoryId]);

	const renderTree = useCallback(() => {
		return data?.rootCellsList.map((el, index) => (
			<Cell key={el._currentCategory!._id + index} cell={el} />
		));
	}, [data]);

	return <div className="tree">{renderTree()}</div>;
};

export default Tree;
