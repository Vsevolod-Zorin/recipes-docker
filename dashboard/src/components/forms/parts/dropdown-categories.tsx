import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'src/components/BreadCrumbs';
import Dropdown, { IDropdownOption } from 'src/components/inputs/dropdown';
import { ICell } from 'src/helpers/treeBuilder';
import { ICategory } from 'src/types/category/category.interface';

interface IDropdownCategoriesProps {
	categories: ICategory[];
	cells: ICell[];
	value: string | number;
	onChange: (e: React.ChangeEvent<any>) => void;
	className?: string;
	name: string;
}

const options = [
	{ label: 'Fruit', value: 'fruit' },
	{ label: 'Vegetable', value: 'vegetable' },
	{ label: 'Meat', value: 'meat' },
];
const DropdownCategories: React.FC<IDropdownCategoriesProps> = ({
	cells,
	value,
	onChange,
	className,
	name,
}) => {
	const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([]);

	useEffect(() => {
		if (cells) {
			rec(cells);
		}
	}, [cells]);

	const rec = (cellsList: ICell[]) => {
		cellsList.forEach((el, index, arr) => {
			const breadcrumbs = el.initBreadcrumbs!()
				.map(el => el._currentCategory?.name)
				.join('  ');
			const label = el._currentCategory?.name + ': ' + breadcrumbs;
			const item: IDropdownOption = {
				label,
				value: el._currentCategory!._id,
			};
			setDropdownOptions(prev => [...prev, item]);
			if (el._next.length > 0) {
				rec(el._next);
			}
		});
	};

	return (
		<div className={className}>
			<Dropdown name={name} value={value} onChange={onChange} options={dropdownOptions} />
			{/* <Breadcrumbs cell={cell} /> */}
		</div>
	);
};

export default DropdownCategories;
