import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { TreeManager } from 'src/helpers/treeBuilder';
import { ICategoryWrapper } from 'src/store/reducers/category.slice';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
	tagTypes: ['Category'],
	refetchOnFocus: true,

	endpoints: build => ({
		fetchAllCategories: build.query<ICategoryWrapper, {}>({
			query: () => ({
				url: '/category',
			}),
			transformResponse: (response: ICategory[]) => {
				const treeManager = new TreeManager(response);
				treeManager.init();
				const rootCellsList = treeManager.rootCellsList;
				const cellsList = treeManager.cellsList;
				let data: ICategoryWrapper = {
					categoriesList: response,
					rootCellsList,
					cellsList,
				};
				return data;
			},
		}),

		createCategory: build.mutation<ICategory, ICategoryCreate>({
			query: (data: ICategoryCreate) => ({
				url: '/category',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Category'],
		}),
		updateCategory: build.mutation<ICategory, ICategoryUpdate>({
			query: (update: ICategoryUpdate) => ({
				url: `/category/${update.id}`,
				method: 'PUT',
				body: update,
			}),
			invalidatesTags: ['Category'],
		}),
		deleteCategory: build.mutation<null, {}>({
			query: (id: string) => ({
				url: `/category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Category'],
		}),
	}),
});

export const {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useFetchAllCategoriesQuery,
	useLazyFetchAllCategoriesQuery,
} = categoryApi;
