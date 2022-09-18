import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from 'src/hooks/redux';
import { useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { categoryActions } from 'src/store/reducers/category.slice';
import './recipe.scss';

const Recipe = () => {
	const { recipeId, categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoryId) {
			// open tree on new page
			dispatch(categoryActions.setSelectedCell(categoryId));
		}
	}, [categoryId, dispatch]);

	const recipe = useMemo(() => {
		const recipe = data?.find(el => el._id === recipeId);
		return recipe || null;
	}, [data, recipeId]);

	const renderRecipe = useCallback(() => {
		if (recipe && categoryId && recipeId) {
			return (
				<div className="recipe__item--wrapper">
					<h1>Recipe: {recipeId}</h1>
					<h1>category: {categoryId}</h1>
					<h1>title: {recipe?.title}</h1>
					<h1>description: {recipe?.description}</h1>
					<h1>updatedAt: {new Date(recipe.updatedAt!).toLocaleDateString()}</h1>
				</div>
			);
		}
	}, [recipe, categoryId, recipeId]);

	return <div className="recipe__item">{renderRecipe()}</div>;
};

export default Recipe;
