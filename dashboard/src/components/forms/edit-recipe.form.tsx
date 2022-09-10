import React, { useEffect, useState, useMemo } from 'react';
import { useFormik, Field } from 'formik';
import { IRecipe, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import './forms.scss';
import { useUpdateRecipeMutation } from 'src/services/recipe.api';

interface IEditRecipeFormProps {
	recipe: IRecipe | null;
	// onUpdate: (recipe: IRecipe) => void;
}

const EditRecipeForm: React.FC<IEditRecipeFormProps> = ({ recipe }) => {
	// const { updateRecipe } = useUpdateRecipeMutation();

	const formik = useFormik<IRecipeUpdate>({
		initialValues: {
			id: recipe!._id,
			title: recipe!.title,
			description: recipe!.description,
			categoryId: recipe!.categoryId,
		},
		onSubmit: async (values: IRecipeUpdate) => {
			// onUpdate(values);
			console.log(values);
			// updateRecipe(values as IRecipeUpdate);
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
					text
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
					text
				</label>
				<input
					className="form__input--input"
					id="description"
					type="text"
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
			<button className="form__btn__submit" type="submit">
				update
			</button>
		</form>
	);
};

export default EditRecipeForm;
