import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IRecipe, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import { useUpdateRecipeMutation } from 'src/services/recipe.api';
import './forms.scss';
import { IFormDefault } from './form-default.interface';

interface IEditRecipeFormProps extends IFormDefault {
	recipe: IRecipe | null;
}

const EditRecipeForm: React.FC<IEditRecipeFormProps> = ({ recipe, closeModal }) => {
	// todo error
	const [updateRecipe, { isSuccess }] = useUpdateRecipeMutation();

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
		onSubmit: async (values: IRecipeUpdate) => {
			updateRecipe(values);
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
					value={formik.values.categoryId}
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
