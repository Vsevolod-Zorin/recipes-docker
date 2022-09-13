import React from 'react';
import { useFormik } from 'formik';
import { useUpdateCategoryMutation } from 'src/services/category.api';
import { ICategory, ICategoryUpdate } from 'src/types/category/category.interface';
import './forms.scss';

interface IUpdateCategoryFormProps {
	category: ICategory | null;
}

const EditCategoryForm: React.FC<IUpdateCategoryFormProps> = ({ category }) => {
	const [updateCategory, {}] = useUpdateCategoryMutation({});

	const formik = useFormik<ICategoryUpdate>({
		initialValues: {
			id: category!._id,
			name: category!.name,
			parentId: category!.parentId,
		},
		onSubmit: async (values: ICategoryUpdate) => {
			const data: ICategoryUpdate = { ...values };
			if (values.parentId === '') data.parentId = null;
			updateCategory(data);
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
				update
			</button>
		</form>
	);
};

export default EditCategoryForm;
