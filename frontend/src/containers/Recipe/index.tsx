import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { useFetchRecipeByIdQuery } from 'src/services/recipe.api';
import './recipe.scss';

const Recipe = () => {
	const { recipeId, categoryId } = useParams();
	const { data: recipe } = useFetchRecipeByIdQuery(recipeId as string);

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
