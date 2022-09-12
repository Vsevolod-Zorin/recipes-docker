import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import CreateRecipeForm from 'src/components/forms/create-recipe.form';
import DeleteRecipeForm from 'src/components/forms/delete-recipe.form';
import EditRecipeForm from 'src/components/forms/edit-recipe.form';
import ModalForm from 'src/components/Modal';
import RecipeItem from 'src/components/RecipeItem';

import { useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipes.scss';

const Recipes = () => {
	const { categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);

	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
	const [editForm, setEditForm] = useState<boolean>(false);
	const [createForm, setCreateForm] = useState<boolean>(false);
	const [deleteForm, setDeleteForm] = useState<boolean>(false);

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

	const handleClickCreate = () => {
		setCreateForm(true);
	};

	const handleClickDelete = () => {
		setDeleteForm(true);
	};

	return (
		<div className="recipes recipes-wrapper">
			<section className="recipes__left-part">
				<h1>recipes List</h1>
				<ul className="recipes__list">{renderList()}</ul>
			</section>
			<section className="recipes__right-part">
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
			</section>
			<ModalForm modalTitle="create" active={createForm} setActive={setCreateForm}>
				<CreateRecipeForm />
			</ModalForm>
			{selectedRecipe && (
				<ModalForm modalTitle="edit" active={editForm} setActive={setEditForm}>
					<EditRecipeForm recipe={selectedRecipe} />
				</ModalForm>
			)}
			{selectedRecipe && (
				<ModalForm modalTitle="delete" active={deleteForm} setActive={setDeleteForm}>
					<DeleteRecipeForm recipe={selectedRecipe} />
				</ModalForm>
			)}
		</div>
	);
};

export default Recipes;
