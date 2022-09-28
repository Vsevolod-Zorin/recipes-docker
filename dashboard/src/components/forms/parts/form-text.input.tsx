import React, { ChangeEvent, useCallback } from 'react';

interface IFormTextInput {
	label: string;
	placeholder: string;
	value: string;
	name: string;
	onChange(e: ChangeEvent): void;
	errorMessage?: string;
	touched?: boolean;
	onBlur?: (e: ChangeEvent) => void;
	required: boolean;
}

const FormTextInput: React.FC<IFormTextInput> = ({
	label,
	placeholder,
	value,
	name,
	onChange,
	errorMessage,
	touched,
	onBlur,
	required,
}) => {
	const renderErrors = useCallback(() => {
		if (touched && errorMessage) {
			return <div className="form__input--error">{errorMessage}</div>;
		}
	}, [errorMessage, touched]);
	return (
		<div className="form__input--wrapper">
			<label className="form__input--label" htmlFor={label}>
				{label}
				{required && <span> *</span>}
			</label>
			<input
				className={`form__input--input ${touched && errorMessage && 'error'}`}
				id={label}
				type="text"
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{renderErrors()}
		</div>
	);
};

export default FormTextInput;
