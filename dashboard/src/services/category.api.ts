import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { TreeManager } from 'src/helpers/treeBuilder';
import { ICategoryWrapper } from 'src/store/reducers/category.slice';
import { ICategory } from 'src/types/category/category.interface';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
	tagTypes: ['Category'],
	// refetchOnFocus: true,
	endpoints: build => ({
		fetchAllCategories: build.query<ICategoryWrapper, {}>({
			query: () => ({
				url: '/category',
			}),
			transformResponse: (response: ICategory[]) => {
				const treeManager = new TreeManager(response);
				treeManager.init();
				const sortedCellsList = treeManager.sortedCellsList;

				let data: ICategoryWrapper = {
					categoriesList: response,
					cellsList: sortedCellsList,
				};
				return data;
			},
		}),
	}),
});

export const { useFetchAllCategoriesQuery, useLazyFetchAllCategoriesQuery } = categoryApi;
