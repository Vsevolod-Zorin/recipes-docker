import React, { useMemo } from 'react';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipe-item.scss';

interface IRecipeItemProps {
	recipe: IRecipe;
}

const RecipeItem: React.FC<IRecipeItemProps> = ({ recipe }) => {
	const { description, title, categoryId } = recipe;
	const { data } = useFetchAllCategoriesQuery({});

	const categoryName = useMemo(() => {
		const category = data?.cellsList.find(el => el._currentCategory?._id === categoryId);
		return category?._currentCategory?.name;
	}, [data, categoryId]);

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
				<span>category: </span> {categoryName}
			</div>
			<div className="recipe__list-item--updated">
				<span>updated: </span> {new Date(recipe.updatedAt!).toLocaleDateString()}
			</div>
		</div>
	);
};

export default RecipeItem;
