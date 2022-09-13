import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';

export const recipeApi = createApi({
	reducerPath: 'recipeApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
	tagTypes: ['Recipe'],
	refetchOnFocus: true,
	endpoints: build => ({
		fetchAllRecipes: build.query<IRecipe[], string>({
			query: (id: string) => ({
				// todo
				url: '/recipe/test',
				params: {
					id,
				},
			}),
			providesTags: result => ['Recipe'],
		}),

		createRecipe: build.mutation<IRecipe, IRecipeCreate>({
			query: (data: IRecipeCreate) => ({
				url: '/recipe',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Recipe'],
		}),
		updateRecipe: build.mutation<IRecipe, IRecipeUpdate>({
			query: (update: IRecipeUpdate) => ({
				url: '/recipe',
				method: 'PUT',
				body: update,
			}),
			invalidatesTags: ['Recipe'],
		}),
		deleteRecipe: build.mutation<null, {}>({
			query: (id: string) => ({
				url: `/recipe/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Recipe'],
		}),
	}),
});

export const {
	useCreateRecipeMutation,
	useFetchAllRecipesQuery,
	useLazyFetchAllRecipesQuery,
	useUpdateRecipeMutation,
	useDeleteRecipeMutation,
} = recipeApi;
