import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IRecipe, IRecipeDelete } from 'src/types/recipe/recipe.interface';
import { useDeleteRecipeMutation, useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { IFormDefault } from './form-default.interface';
import './forms.scss';

interface IDeleteRecipeFormProps extends IFormDefault {
	recipe: IRecipe;
}

const DeleteRecipeForm: React.FC<IDeleteRecipeFormProps> = ({ recipe, closeModal }) => {
	const { refetch } = useFetchAllRecipesQuery(recipe.categoryId as string);

	const [deleteRecipe, { isSuccess }] = useDeleteRecipeMutation();

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<IRecipeDelete>({
		initialValues: {
			id: recipe._id,
			title: recipe.title,
			description: recipe.description,
			categoryId: recipe.categoryId,
		},
		onSubmit: async (values: IRecipeDelete) => {
			await deleteRecipe(values.id);
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
					disabled
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
					disabled
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
					disabled
				/>
			</div>
			<button
				className="btn btn__content--success form__btn__submit"
				type="submit"
				disabled={formik.isSubmitting}
			>
				delete
			</button>
		</form>
	);
};

export default DeleteRecipeForm;
