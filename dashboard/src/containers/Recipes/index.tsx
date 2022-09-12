import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import EditRecipeForm from 'src/components/forms/edit-recipe.form';
import ModalForm from 'src/components/Modal';
import RecipeItem from 'src/components/RecipeItem';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { useFetchAllRecipesQuery, useUpdateRecipeMutation } from 'src/services/recipe.api';
import { IRecipe, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import './recipes.scss';

const Recipes = () => {
	const { categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);
	// const category = useAppSelector();
	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
	const [editForm, setEditForm] = useState<boolean>(false);
	// const { updateRecipe } = useUpdateRecipeMutation();

	useEffect(() => {
		return setSelectedRecipe(null);
	}, [categoryId]);

	const renderList = useCallback(() => {
		if (data) {
			return data.map((el, index) => (
				<li
					className="recipes__list--item"
					key={`recipeListItem-${index}`}
					onClick={() => setSelectedRecipe(el)}
				>
					<RecipeItem recipe={el} />
				</li>
			));
		}
	}, [data]);

	const handleClickEdit = () => {
		setEditForm(true);
	};

	const onUpdateRecipe = (values: IRecipeUpdate) => {
		// updateRecipe(values);
	};

	return (
		<div className="recipes recipes-wrapper">
			<section className="recipes__left-part">
				<h1>recipes List</h1>
				<ul className="recipes__list">{renderList()}</ul>
			</section>
			<section className="recipes__right-part">
				<div className="right-part__controls">
					<button className="btn">add</button>

					<button className="btn" onClick={handleClickEdit} disabled={!selectedRecipe}>
						edit
					</button>
					<button className="btn" disabled={!selectedRecipe}>
						delete
					</button>
				</div>
				<div className="right-part__preview">
					<span>preview</span>
					{selectedRecipe && <RecipeItem recipe={selectedRecipe} />}
				</div>
			</section>
			{selectedRecipe && (
				<ModalForm modalTitle="edit" active={editForm} setActive={setEditForm}>
					<EditRecipeForm recipe={selectedRecipe} />
				</ModalForm>
			)}
		</div>
	);
};

export default Recipes;
