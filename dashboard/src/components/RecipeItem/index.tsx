import React from 'react';
import { IRecipe } from 'src/types/recipe/recipe.interface';

interface IRecipeItemProps {
	recipe: IRecipe;
}

const RecipeItem: React.FC<IRecipeItemProps> = ({ recipe }) => {
	const { description, title, categoryId } = recipe;
	return (
		<div className="recipe recipe__item">
			<div className="recipe__item--title">{title}</div>
			<div className="recipe__item--description">{description}</div>
			<div className="recipe__item--category">category: {categoryId}</div>
		</div>
	);
};

export default RecipeItem;
