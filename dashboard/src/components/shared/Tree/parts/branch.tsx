import React from 'react';
import { ICategory } from 'src/types/category/category.interface';

interface IBranchProps {
	category: ICategory;
}
const Branch: React.FC<IBranchProps> = ({ category }) => {
	return <div>branch</div>;
};

export default Branch;
