import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { ICategory } from 'src/types/category/category.interface';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
	tagTypes: ['Category'],
	// refetchOnFocus: true,
	endpoints: build => ({
		fetchAllCategories: build.query<ICategory[], {}>({
			query: () => ({
				url: '/category',
			}),
		}),
	}),
});

export const { useFetchAllCategoriesQuery, useLazyFetchAllCategoriesQuery } = categoryApi;
