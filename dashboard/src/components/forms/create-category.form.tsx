import React from 'react';
import { useFormik } from 'formik';
import { useCreateCategoryMutation } from 'src/services/category.api';
import { ICategoryCreate } from 'src/types/category/category.interface';
import './forms.scss';

interface ICreateCategoryFormProps {}

const CreateCategoryForm: React.FC<ICreateCategoryFormProps> = () => {
	const [createCategory, {}] = useCreateCategoryMutation({});

	const formik = useFormik<ICategoryCreate>({
		initialValues: {
			name: '',
			parentId: '',
		},
		onSubmit: async (values: ICategoryCreate) => {
			const data: ICategoryCreate = { ...values };
			if (values.parentId === '') values.parentId = null;
			createCategory(values);
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="name">
					name
				</label>
				<input
					className="form__input--input"
					id="name"
					type="text"
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="parentId">
					parentId
				</label>
				<input
					className="form__input--input"
					id="parentId"
					name="parentId"
					value={formik.values.parentId || ''}
					onChange={formik.handleChange}
				/>
			</div>
			<button
				className="btn btn__content--success form__btn__submit"
				type="submit"
				disabled={formik.isSubmitting}
			>
				create
			</button>
		</form>
	);
};

export default CreateCategoryForm;
