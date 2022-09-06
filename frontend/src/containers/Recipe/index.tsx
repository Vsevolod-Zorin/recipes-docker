import React from 'react';
import { useParams } from 'react-router';
import './recipe.scss';

const Recipe = () => {
	const { recipeId } = useParams();
	return (
		<div>
			<h1>Recipe: {recipeId}</h1>
		</div>
	);
};

export default Recipe;
