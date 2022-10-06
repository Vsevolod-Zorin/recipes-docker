import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IPagination } from 'src/types/pagination.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';

export const recipeApi = createApi({
	reducerPath: 'recipeApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),

	endpoints: build => ({
		fetchRecipesPagination: build.query<IRecipe[], IPagination>({
			query: ({ categoryId, skip, limit }) => ({
				url: `/recipe/pagination`,
				params: {
					categoryId,
					skip,
					limit,
				},
			}),
		}),

		fetchRecipeById: build.query<IRecipe, string>({
			query: (id: string) => ({
				url: `/recipe/${id}`,
			}),
		}),
	}),
});

export const {
	useLazyFetchRecipesPaginationQuery,
	useFetchRecipesPaginationQuery,
	useFetchRecipeByIdQuery,
} = recipeApi;
