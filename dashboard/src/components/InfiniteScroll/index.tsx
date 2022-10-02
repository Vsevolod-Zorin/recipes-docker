import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useLazyFetchRecipesPaginationQuery } from 'src/services/recipe.api';
import { selectRecipePaginationInfo } from 'src/store/selectors';
import { IPost } from 'src/types/post/post.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';

interface IInfiniteScroll {
	dataList: IRecipe[] | IPost[];
}

const InfiniteScroll: React.FC<IInfiniteScroll> = () => {
	const dispatch = useAppDispatch();
	const [fetchRecipes, { isLoading, data }] = useLazyFetchRecipesPaginationQuery();
	const { skip, limit } = useAppSelector(selectRecipePaginationInfo);
	return (
		<div>
			<button>load more</button>
		</div>
	);
};

export default InfiniteScroll;
