import React, { useEffect } from 'react';
import appManager from 'src/helpers/app.manager';
import './recipes.scss';

const Recipes = () => {
	useEffect(() => {
		if (appManager.selectCategoryId) {
			// fetch by category
		} else {
			// fetch all
		}
	}, []);

	return (
		<div>
			<h1>Recipes</h1>
		</div>
	);
};

export default Recipes;
