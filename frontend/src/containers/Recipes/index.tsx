import React from 'react';
import RecipesList from 'src/components/RecipesList';
import './recipes.scss';

const Recipes = () => {
	return (
		<div className="recipes recipes-wrapper ">
			<section className="recipes__left-part custom-scroll">
				<h1>recipes List: </h1>
				<RecipesList />
			</section>
		</div>
	);
};

export default Recipes;
