import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CreateRecipeForm from 'src/components/forms/create-recipe.form';
import DeleteRecipeForm from 'src/components/forms/delete-recipe.form';
import EditRecipeForm from 'src/components/forms/edit-recipe.form';
import ModalForm from 'src/components/Modal';
import RecipeItem from 'src/components/RecipeItem';
import RecipesList from 'src/components/RecipesList';
import { useAppDispatch } from 'src/hooks/redux';
import { appActions } from 'src/store/reducers/app.slice';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipes.scss';

const Recipes = () => {
	const { categoryId } = useParams();
	const [createForm, setCreateForm] = useState<boolean>(false);
	const [editForm, setEditForm] = useState<boolean>(false);
	const [deleteForm, setDeleteForm] = useState<boolean>(false);
	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
	const [isRefreshList, setIsRefreshList] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoryId) {
			dispatch(appActions.setSelectedCategoryId(categoryId));
		}
		return setSelectedRecipe(null);
	}, [categoryId]);

	const handleClickCreate = () => {
		setCreateForm(true);
	};

	const handleCloseCreateModal = () => {
		setCreateForm(false);
		setIsRefreshList(true);
	};

	const handleClickEdit = () => {
		setEditForm(true);
	};

	const handleCloseEditModal = () => {
		setEditForm(false);
		setIsRefreshList(true);
	};

	const handleClickDelete = () => {
		setDeleteForm(true);
	};

	const handleCloseDeleteModal = () => {
		setDeleteForm(false);
		setIsRefreshList(true);
	};

	return (
		<div className="recipes recipes-wrapper ">
			<section className="recipes__left-part custom-scroll">
				<h1>recipes List: </h1>
				<RecipesList
					setSelectedRecipe={setSelectedRecipe}
					isRefreshList={isRefreshList}
					setIsRefreshList={setIsRefreshList}
				/>
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
					<CreateRecipeForm closeModal={handleCloseCreateModal} categoryId={categoryId!} />
				</ModalForm>
			)}
			{selectedRecipe && (
				<ModalForm modalTitle="Edit Recipe" active={editForm} setActive={setEditForm}>
					<EditRecipeForm closeModal={handleCloseEditModal} recipe={selectedRecipe} />
				</ModalForm>
			)}
			{selectedRecipe && (
				<ModalForm modalTitle="Delete Recipe" active={deleteForm} setActive={setDeleteForm}>
					<DeleteRecipeForm closeModal={handleCloseDeleteModal} recipe={selectedRecipe} />
				</ModalForm>
			)}
		</div>
	);
};

export default Recipes;
