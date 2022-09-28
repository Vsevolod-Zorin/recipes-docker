import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IRecipe, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import { useFetchAllRecipesQuery, useUpdateRecipeMutation } from 'src/services/recipe.api';
import { IFormDefault } from './form-default.interface';
import DropdownCategories from './parts/dropdown-categories';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import FormTextInput from './parts/form-text.input';
import FormTextAreaInput from './parts/form-textarea.input';
import { EditRecipeSchema } from './parts/validation';
import './forms.scss';

interface IEditRecipeFormProps extends IFormDefault {
	recipe: IRecipe | null;
}

const EditRecipeForm: React.FC<IEditRecipeFormProps> = ({ recipe, closeModal }) => {
	const [updateRecipe, { isSuccess }] = useUpdateRecipeMutation();
	const { refetch } = useFetchAllRecipesQuery(recipe!.categoryId as string);
	const { data } = useFetchAllCategoriesQuery({});

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<IRecipeUpdate>({
		initialValues: {
			id: recipe!._id,
			title: recipe!.title,
			description: recipe!.description,
			categoryId: recipe!.categoryId,
		},
		validationSchema: EditRecipeSchema,
		onSubmit: async (values: IRecipeUpdate) => {
			await updateRecipe(values);
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
					disabled
					className="form__input--input"
					id="id"
					type="text"
					name="id"
					value={formik.values.id}
					onChange={formik.handleChange}
				/>
			</div>
			<FormTextInput
				label="title"
				name="title"
				placeholder="title"
				onChange={formik.handleChange}
				value={formik.values.title as string}
				errorMessage={formik.errors.title}
				touched={formik.touched.title}
				required={true}
			/>
			<FormTextAreaInput
				label="description"
				name="description"
				placeholder="description"
				onChange={formik.handleChange}
				value={formik.values.description as string}
				errorMessage={formik.errors.description}
				touched={formik.touched.description}
				required={true}
			/>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="parentId">
					category
				</label>
				<DropdownCategories
					className="form__input--input"
					name="categoryId"
					categories={data?.categoriesList || []}
					cells={data?.rootCellsList || []}
					value={formik.values.categoryId || ''}
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

export default EditRecipeForm;
