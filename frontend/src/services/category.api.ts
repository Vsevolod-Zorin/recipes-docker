import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { TreeManager } from 'src/utils/treeBuilder';
import { ICategory, ICategoryWrapper } from 'src/types/category/category.interface';

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
	}),
});

export const { useFetchAllCategoriesQuery } = categoryApi;
