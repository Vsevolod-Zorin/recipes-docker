import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useInView } from 'react-hook-inview';
import { useLazyFetchRecipesPaginationQuery } from 'src/services/recipe.api';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import RecipeItem from '../RecipeItem';

interface IRecipeList {
	setSelectedRecipe: (el: IRecipe) => void;
	isRefreshList?: boolean;
	setIsRefreshList?: (value: boolean) => void;
}

const RecipesList: React.FC<IRecipeList> = ({
	setSelectedRecipe,
	isRefreshList,
	setIsRefreshList,
}) => {
	const { categoryId } = useParams();
	const [fetchPagination, { data: fetchedData }] = useLazyFetchRecipesPaginationQuery();
	const [recipes, setRecipes] = useState<IRecipe[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit, setLimit] = useState<number>(50);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [ref, inView] = useInView();

	useEffect(() => {
		const firstInit = async () => {
			if (categoryId) {
				const result = await fetchPagination({ categoryId: categoryId as string, skip: 0, limit });
				if (result.data) {
					setRecipes(result.data);
					setSkip(result.data.length);
				}
			}
		};
		firstInit();
		return () => {
			setSkip(0);
			setRecipes([]);
		};
	}, [categoryId, limit]);

	// add to recipesList
	useEffect(() => {
		if (fetchedData) {
			setRecipes(prev => [...prev, ...fetchedData]);
		}
	}, [fetchedData]);

	useEffect(() => {
		if (fetchedData && fetchedData.length < limit) {
			setHasMore(false);
		}
	}, [fetchedData, limit]);

	useEffect(() => {
		if (inView) {
			loadMore();
		}
	}, [inView]);

	useEffect(() => {
		const refresh = async () => {
			if (categoryId) {
				const result = await fetchPagination({
					categoryId: categoryId as string,
					skip: 0,
					limit: recipes.length + 1,
				});
				if (result.data) {
					setRecipes(result.data);
					setSkip(result.data.length);
				}
			}
		};
		if (isRefreshList && setIsRefreshList) {
			refresh();
			setIsRefreshList(false);
		}
	}, [isRefreshList, categoryId, recipes, skip, limit]);

	const loadMore = useCallback(() => {
		if (categoryId) {
			fetchPagination({ categoryId, skip, limit });
			setSkip(recipes.length);
		}
	}, [categoryId, skip, limit, recipes]);

	const renderList = useCallback(() => {
		return recipes.map((el, index) => (
			<li
				className="recipes__list--item"
				key={`recipeListItem-${index}`}
				onClick={() => setSelectedRecipe(el)}
			>
				<RecipeItem recipe={el} />
			</li>
		));
	}, [recipes, setSelectedRecipe]);

	return (
		<>
			<ul>{renderList()}</ul>
			{hasMore && (
				<button ref={ref} className="btn" onClick={loadMore}>
					loadMore
				</button>
			)}
		</>
	);
};

export default RecipesList;
