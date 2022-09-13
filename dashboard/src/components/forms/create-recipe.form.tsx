import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IRecipeCreate } from 'src/types/recipe/recipe.interface';
import { useCreateRecipeMutation } from 'src/services/recipe.api';
import { useParams } from 'react-router';
import './forms.scss';
import { IFormDefault } from './form-default.interface';

interface ICreateRecipeFormProps extends IFormDefault {}

const CreateRecipeForm: React.FC<ICreateRecipeFormProps> = ({ closeModal }) => {
	const { categoryId } = useParams();
	const [createRecipe, { isSuccess }] = useCreateRecipeMutation();

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
		onSubmit: async (values: IRecipeCreate) => {
			await createRecipe(values);
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="title">
					title
				</label>
				<input
					className="form__input--input"
					id="title"
					type="text"
					name="title"
					value={formik.values.title}
					onChange={formik.handleChange}
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="description">
					description
				</label>
				<textarea
					className="form__input--input"
					id="description"
					name="description"
					value={formik.values.description}
					onChange={formik.handleChange}
				/>
			</div>
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
