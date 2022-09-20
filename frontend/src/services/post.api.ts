import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IPost } from 'src/types/post/post.interface';

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
	tagTypes: ['Post'],
	refetchOnFocus: true,

	endpoints: build => ({
		fetchAllPosts: build.query<IPost[], string>({
			query: (id: string) => ({
				url: `/post/category/${id}`,
			}),
		}),
	}),
});

export const { useFetchAllPostsQuery } = postApi;
