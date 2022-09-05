import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from 'src/types/category/category.interface';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
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
