import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import RecipeItem from 'src/components/RecipeItem';
import { useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipes.scss';

const Recipes = () => {
	const { categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);
	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

	useEffect(() => {
		return setSelectedRecipe(null);
	}, [categoryId]);

	const renderList = useCallback(() => {
		if (data) {
			return data.map((el, index) => (
				<li key={`recipeListItem-${index}`} onClick={() => setSelectedRecipe(el)}>
					{el.title}
				</li>
			));
		}
	}, [data]);

	return (
		<div className="recipes recipes-wrapper">
			<section className="recipes__left-part">
				<ul>{renderList()}</ul>
			</section>
			<section className="recipes__right-part">
				<div className="right-part__controls">
					<button>add recipe</button>
					<input type="text" />
					<button disabled={!selectedRecipe}>edit recipe</button>
					<button disabled={!selectedRecipe}>delete</button>
				</div>
				<div className="right-part__preview">
					preview
					{selectedRecipe && data && <RecipeItem recipe={selectedRecipe} />}
				</div>
			</section>
		</div>
	);
};

export default Recipes;
