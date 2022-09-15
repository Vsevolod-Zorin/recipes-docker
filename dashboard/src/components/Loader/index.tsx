import React, { useMemo } from 'react';
import {
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useFetchAllCategoriesQuery,
	useUpdateCategoryMutation,
} from 'src/services/category.api';
import {
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
	useFetchAllRecipesQuery,
	useUpdateRecipeMutation,
} from 'src/services/recipe.api';
import './loader.scss';

const Loader = () => {
	const { isLoading: fetchingAllCategories } = useFetchAllCategoriesQuery({});
	const [createCat, { isLoading: createCategory }] = useCreateCategoryMutation();
	const [updateCat, { isLoading: updateCategory }] = useUpdateCategoryMutation();
	const [deleteCat, { isLoading: deleteCategory }] = useDeleteCategoryMutation();

	const { isFetching: fetchingAllRecipes } = useFetchAllRecipesQuery('');
	const [createRecipeFn, { isLoading: createRecipe }] = useCreateRecipeMutation();
	const [updateRecipeFn, { isLoading: updateRecipe }] = useUpdateRecipeMutation();
	const [deleteRecipeFn, { isLoading: deleteRecipe }] = useDeleteRecipeMutation();
	const loading = useMemo(() => {
		return (
			fetchingAllCategories ||
			createCategory ||
			updateCategory ||
			deleteCategory ||
			fetchingAllRecipes ||
			createRecipe ||
			updateRecipe ||
			deleteRecipe
		);
	}, [
		fetchingAllCategories,
		createCategory,
		updateCategory,
		deleteCategory,
		fetchingAllRecipes,
		createRecipe,
		updateRecipe,
		deleteRecipe,
	]);

	return (
		<>
			{loading && (
				<div className="loader-wrapper">
					<h2 className="loader">Loading</h2>
				</div>
			)}
		</>
	);
};

export default Loader;
