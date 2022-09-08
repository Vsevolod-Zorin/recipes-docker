import React, { useCallback } from 'react';
import { ICategory } from 'src/types/category/category.interface';
import Branch from './parts/branch';
import './tree.scss';

interface ITreeProps {
	categories: ICategory[];
}

const Tree: React.FC<ITreeProps> = ({ categories }) => {
	const renderTree = useCallback(() => {
		return categories.map(el => <Branch category={el} />);
	}, [categories]);
	return <div className="tree">{renderTree()}</div>;
};

export default Tree;
