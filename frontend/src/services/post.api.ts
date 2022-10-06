import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IPagination } from 'src/types/pagination.interface';
import { IPost } from 'src/types/post/post.interface';

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),

	endpoints: build => ({
		fetchPostsPagination: build.query<IPost[], IPagination>({
			query: ({ categoryId, skip, limit }) => ({
				url: `/post/pagination`,
				params: {
					categoryId,
					skip,
					limit,
				},
			}),
		}),
		fetchPostById: build.query<IPost, string>({
			query: (id: string) => ({
				url: `/post/${id}`,
			}),
		}),
	}),
});

export const {
	useLazyFetchPostsPaginationQuery,
	useFetchPostsPaginationQuery,
	useFetchPostByIdQuery,
} = postApi;
