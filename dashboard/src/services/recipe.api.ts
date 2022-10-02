import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IPagination } from 'src/types/pagination.interface';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import { createEntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';

export const recipesAdapter = createEntityAdapter<IRecipe>({
	selectId: recipe => recipe._id,
});

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
			// providesTags: result => ['Recipe'],
		}),

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
				url: `/recipe/${update.id}`,
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

export const recipesSelectors = recipesAdapter.getSelectors<EntityState<IRecipe>>(state => state);

export const {
	useCreateRecipeMutation,
	useFetchAllRecipesQuery,
	useUpdateRecipeMutation,
	useDeleteRecipeMutation,
	useFetchRecipesPaginationQuery,
	useLazyFetchRecipesPaginationQuery,
} = recipeApi;
