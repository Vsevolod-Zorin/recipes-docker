import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IRecipe } from 'src/types/recipe/recipe.interface';

export const recipeApi = createApi({
	reducerPath: 'recipeApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
	tagTypes: ['Recipe'],
	refetchOnFocus: true,

	endpoints: build => ({
		fetchAllRecipes: build.query<IRecipe[], string>({
			query: (id: string) => ({
				url: `/recipe/category/${id}`,
			}),
		}),
	}),
});

export const { useFetchAllRecipesQuery } = recipeApi;
