import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import RecipeItem from 'src/components/RecipelistItem';
import { useFetchAllRecipesQuery } from 'src/services/recipe.api';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import './recipes.scss';

const Recipes = () => {
	const navigate = useNavigate();
	const { categoryId } = useParams();
	const { data } = useFetchAllRecipesQuery(categoryId as string);

	const handleClick = (el: IRecipe) => {
		navigate(`/category/${categoryId}/recipe/${el._id}`);
	};

	const renderList = useCallback(() => {
		if (data) {
			return data.map((el, index) => (
				<li
					className="recipes__list--item"
					key={`recipeListItem-${index}`}
					onClick={() => handleClick(el)}
				>
					<RecipeItem recipe={el} />
				</li>
			));
		}
	}, [data]);

	return (
		<div className="recipes recipes-wrapper ">
			<section className="recipes__left-part custom-scroll">
				<h1>recipes List: </h1>
				<ul className="recipes__list recipes__list--item">{renderList()}</ul>
			</section>
		</div>
	);
};

export default Recipes;
