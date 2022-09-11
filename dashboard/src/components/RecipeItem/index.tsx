import React from 'react';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipe-item.scss';
interface IRecipeItemProps {
	recipe: IRecipe;
}

const RecipeItem: React.FC<IRecipeItemProps> = ({ recipe }) => {
	const { description, title, categoryId } = recipe;
	return (
		<div className="recipe recipe__item">
			<div className="recipe__item--title">
				<span>title: </span>
				{title}
			</div>
			<div className="recipe__item--description">
				<span>description: </span> {description}
			</div>
			<div className="recipe__item--category">
				<span>category: </span> {categoryId}
			</div>
		</div>
	);
};

export default RecipeItem;
