import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInView } from 'react-hook-inview';
import { useLazyFetchRecipesPaginationQuery } from 'src/services/recipe.api';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import RecipeItem from '../RecipelistItem';

interface IRecipeList {}

const RecipesList: React.FC<IRecipeList> = () => {
	const { categoryId } = useParams();
	const [fetchPagination, { data: fetchedData }] = useLazyFetchRecipesPaginationQuery();
	const [recipes, setRecipes] = useState<IRecipe[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit, setLimit] = useState<number>(50);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [ref, inView] = useInView();
	const navigate = useNavigate();

	useEffect(() => {
		const firstInit = async () => {
			if (categoryId) {
				const result = await fetchPagination({ categoryId: categoryId as string, skip: 0, limit });
				if (result.data) {
					setRecipes(result.data);
					setSkip(limit);
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

	const loadMore = useCallback(() => {
		if (categoryId) {
			fetchPagination({ categoryId, skip, limit });
			setSkip(recipes.length + limit);
		}
	}, [categoryId, skip, limit, recipes]);

	const handleClick = (el: IRecipe) => {
		navigate(`/category/${categoryId}/recipe/${el._id}`);
	};

	const renderList = useCallback(() => {
		return recipes.map((el, index) => (
			<li
				className="recipes__list--item"
				key={`recipeListItem-${index}`}
				onClick={() => handleClick(el)}
			>
				<RecipeItem recipe={el} />
			</li>
		));
	}, [recipes]);

	return (
		<>
			<ul className="recipes__list">{renderList()}</ul>
			{hasMore && (
				<button ref={ref} className="btn" onClick={loadMore}>
					loadMore
				</button>
			)}
		</>
	);
};

export default RecipesList;
