import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useFetchAllCategoriesQuery, useUpdateCategoryMutation } from 'src/services/category.api';
import { ICategory, ICategoryUpdate } from 'src/types/category/category.interface';
import { IFormDefault } from './form-default.interface';
import DropdownCategories from './parts/dropdown-categories';
import FormTextInput from './parts/form-text.input';
import { EditCategorySchema } from './parts/validation';
import './forms.scss';

interface IUpdateCategoryFormProps extends IFormDefault {
	category: ICategory | null;
}

const EditCategoryForm: React.FC<IUpdateCategoryFormProps> = ({ category, closeModal }) => {
	const { data, refetch } = useFetchAllCategoriesQuery({});
	const [updateCategory, { isSuccess }] = useUpdateCategoryMutation({});

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<ICategoryUpdate>({
		initialValues: {
			id: category!._id,
			name: category!.name,
			parentId: category!.parentId,
		},
		validationSchema: EditCategorySchema,
		onSubmit: async (values: ICategoryUpdate) => {
			const data: ICategoryUpdate = { ...values };
			if (values.parentId === '') data.parentId = null;
			await updateCategory(data);
			refetch();
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="id">
					id
				</label>
				<input
					className="form__input--input"
					id="id"
					type="text"
					name="id"
					value={formik.values.id}
					disabled
				/>
			</div>
			<FormTextInput
				label="name"
				name="name"
				placeholder="name"
				onChange={formik.handleChange}
				value={formik.values.name}
				errorMessage={formik.errors.name}
				touched={formik.touched.name}
				required={true}
			/>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="parentId">
					parentId
				</label>
				<DropdownCategories
					className="form__input--input"
					name="parentId"
					categories={data?.categoriesList || []}
					cells={data?.rootCellsList || []}
					value={formik.values.parentId || ''}
					onChange={formik.handleChange}
					category={category!}
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
