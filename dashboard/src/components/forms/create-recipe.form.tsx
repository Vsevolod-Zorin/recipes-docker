import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IRecipeCreate } from 'src/types/recipe/recipe.interface';
import { useCreateRecipeMutation, useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { IFormDefault } from './form-default.interface';
import FormTextInput from './parts/form-text.input';
import FormTextAreaInput from './parts/form-textarea.input';
import { CreateRecipeSchema } from './parts/validation';
import './forms.scss';

interface ICreateRecipeFormProps extends IFormDefault {
	categoryId: string;
}

const CreateRecipeForm: React.FC<ICreateRecipeFormProps> = ({ closeModal, categoryId }) => {
	const [createRecipe, { isSuccess }] = useCreateRecipeMutation();
	const { refetch } = useFetchAllRecipesQuery(categoryId as string);

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<IRecipeCreate>({
		initialValues: {
			title: '',
			description: '',
			categoryId: categoryId!,
		},
		validationSchema: CreateRecipeSchema,
		onSubmit: async (values: IRecipeCreate) => {
			await createRecipe(values);
			refetch();
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<FormTextInput
				label="title"
				name="title"
				placeholder="title"
				onChange={formik.handleChange}
				value={formik.values.title}
				errorMessage={formik.errors.title}
				touched={formik.touched.title}
				required={true}
			/>
			<FormTextAreaInput
				label="description"
				name="description"
				placeholder="description"
				onChange={formik.handleChange}
				value={formik.values.description}
				errorMessage={formik.errors.description}
				touched={formik.touched.description}
				required={true}
			/>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="categoryId">
					category Id
				</label>
				<input
					className="form__input--input"
					id="categoryId"
					type="text"
					name="categoryId"
					value={formik.values.categoryId || ''}
					onChange={formik.handleChange}
					disabled
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

export default CreateRecipeForm;
