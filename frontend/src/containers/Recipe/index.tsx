import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { useFetchAllRecipesQuery } from 'src/services/recipe.api';
import './recipe.scss';

const Recipe = () => {
	const { recipeId, categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);

	const recipe = useMemo(() => {
		const recipe = data?.find(el => el._id === recipeId);
		return recipe || null;
	}, [data]);

	const renderRecipe = useCallback(() => {
		return (
			<div className="recipe__item--wrapper">
				<h1>Recipe: {recipeId}</h1>
				<h1>category: {categoryId}</h1>
				<h1>title: {recipe?.title}</h1>
				<h1>description: {recipe?.description}</h1>
				{/* <h1>updatedAt: {recipe?.updatedAt?.toDateString() || ''}</h1> */}
			</div>
		);
	}, [recipe]);

	return <div className="recipe__item">{renderRecipe()}</div>;
};

export default Recipe;
