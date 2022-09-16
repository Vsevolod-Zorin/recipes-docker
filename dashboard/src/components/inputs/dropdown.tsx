import React from 'react';

export interface IDropdownOption {
	label: string;
	value: string;
}

interface IDropdownProps {
	label?: string;
	className?: string;
	options: IDropdownOption[];
	value: string | number;
	onChange: (e: React.ChangeEvent<any>) => void;
	name: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
	label,
	className,
	value,
	options,
	onChange,
	name,
}) => {
	return (
		<label>
			{label && label}
			<select name={name} onChange={onChange} value={value} className={`dropdown ${className}`}>
				{options.map((option, index) => (
					<option key={'option-' + index} className="dropdown__option" value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
};
export default Dropdown;
