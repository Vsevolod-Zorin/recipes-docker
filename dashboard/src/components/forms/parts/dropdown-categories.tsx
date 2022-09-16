import React, { useEffect, useState } from 'react';
import Dropdown, { IDropdownOption } from 'src/components/inputs/dropdown';
import { ICell } from 'src/helpers/treeBuilder';
import { ICategory } from 'src/types/category/category.interface';

interface IDropdownCategoriesProps {
	categories: ICategory[];
	cells: ICell[];
	category?: ICategory;
	value: string | number;
	onChange: (e: React.ChangeEvent<any>) => void;
	className?: string;
	name: string;
}

const DropdownCategories: React.FC<IDropdownCategoriesProps> = ({
	cells,
	value,
	onChange,
	className,
	name,
	category,
}) => {
	const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([
		{ label: 'null', value: '' },
	]);

	useEffect(() => {
		if (cells) {
			rec(cells);
		}
	}, [cells]);

	const rec = (cellsList: ICell[]) => {
		cellsList.forEach((el, index, arr) => {
			if (el._currentCategory?._id !== category?._id) {
				const breadcrumbs = el.initBreadcrumbs!()
					.map(el => el._currentCategory?.name)
					.join('  ');

				const label = el._currentCategory?.name + ' -> ' + breadcrumbs;
				const item: IDropdownOption = {
					label,
					value: el._currentCategory!._id,
				};

				setDropdownOptions(prev => [...prev, item]);
				if (el._next.length > 0) {
					rec(el._next);
				}
			}
		});
	};

	return (
		<div className={className}>
			<Dropdown name={name} value={value} onChange={onChange} options={dropdownOptions} />
		</div>
	);
};

export default DropdownCategories;
