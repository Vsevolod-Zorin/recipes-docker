import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import CreateRecipeForm from 'src/components/forms/create-recipe.form';
import DeleteRecipeForm from 'src/components/forms/delete-recipe.form';
import EditRecipeForm from 'src/components/forms/edit-recipe.form';
import ModalForm from 'src/components/Modal';
import RecipeItem from 'src/components/RecipeItem';
import { useAppDispatch } from 'src/hooks/redux';
import { useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { categoryActions } from 'src/store/reducers/category.slice';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipes.scss';

const Recipes = () => {
	const { categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);

	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
	const [createForm, setCreateForm] = useState<boolean>(false);
	const [editForm, setEditForm] = useState<boolean>(false);
	const [deleteForm, setDeleteForm] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoryId) {
			dispatch(categoryActions.setSelectedCell(categoryId));
		}
		return setSelectedRecipe(null);
	}, [categoryId]);

	useEffect(() => {}, [categoryId]);

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

	const handleClickCreate = () => {
		setCreateForm(true);
	};

	const handleClickEdit = () => {
		setEditForm(true);
	};

	const handleClickDelete = () => {
		setDeleteForm(true);
	};

	return (
		<div className="recipes recipes-wrapper ">
			<section className="recipes__left-part custom-scroll">
				<h1>recipes List: </h1>
				<ul className="recipes__list">{renderList()}</ul>
			</section>
			<section className="recipes__right-part">
				<div className="right-part__wrapper">
					<div className="right-part__controls">
						<button className="btn" onClick={handleClickCreate}>
							add
						</button>

						<button className="btn" onClick={handleClickEdit} disabled={!selectedRecipe}>
							edit
						</button>
						<button className="btn" onClick={handleClickDelete} disabled={!selectedRecipe}>
							delete
						</button>
					</div>
					<div className="right-part__preview">
						<span>preview</span>
						{selectedRecipe && <RecipeItem recipe={selectedRecipe} />}
					</div>
				</div>
			</section>
			{createForm && (
				<ModalForm modalTitle="Create Recipe" active={createForm} setActive={setCreateForm}>
					<CreateRecipeForm closeModal={() => setCreateForm(false)} categoryId={categoryId!} />
				</ModalForm>
			)}
			{selectedRecipe && (
				<ModalForm modalTitle="Edit Recipe" active={editForm} setActive={setEditForm}>
					<EditRecipeForm closeModal={() => setEditForm(false)} recipe={selectedRecipe} />
				</ModalForm>
			)}
			{selectedRecipe && (
				<ModalForm modalTitle="Delete Recipe" active={deleteForm} setActive={setDeleteForm}>
					<DeleteRecipeForm closeModal={() => setDeleteForm(false)} recipe={selectedRecipe} />
				</ModalForm>
			)}
		</div>
	);
};

export default Recipes;
