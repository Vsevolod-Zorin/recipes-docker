import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useCreateCategoryMutation, useFetchAllCategoriesQuery } from 'src/services/category.api';
import { ICategoryCreate } from 'src/types/category/category.interface';
import { IFormDefault } from './form-default.interface';
import DropdownCategories from './parts/dropdown-categories';
import { CreateCategorySchema } from './parts/validation';
import FormTextInput from './parts/form-text.input';
import './forms.scss';

interface ICreateCategoryFormProps extends IFormDefault {}

const CreateCategoryForm: React.FC<ICreateCategoryFormProps> = ({ closeModal }) => {
	const { data, refetch } = useFetchAllCategoriesQuery({});
	const [createCategory, { isSuccess }] = useCreateCategoryMutation({});

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<ICategoryCreate>({
		initialValues: {
			name: '',
			parentId: '',
		},
		validationSchema: CreateCategorySchema,
		onSubmit: async (values: ICategoryCreate) => {
			if (values.parentId === '') values.parentId = null;
			await createCategory(values);
			refetch();
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<div className="form__input--wrapper">
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
			</div>
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
