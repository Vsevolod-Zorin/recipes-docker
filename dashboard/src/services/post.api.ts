import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'src/config';
import { IPagination } from 'src/types/pagination.interface';
import { IPost, IPostCreate, IPostUpdate } from 'src/types/post/post.interface';

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

		fetchPostsPagination: build.query<IPost[], IPagination>({
			query: ({ categoryId, skip, limit }) => ({
				url: `/post/pagination`,
				params: {
					categoryId,
					skip,
					limit,
				},
			}),
			providesTags: result => ['Post'],
		}),

		createPost: build.mutation<IPost, IPostCreate>({
			query: (data: IPostCreate) => ({
				url: '/post',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Post'],
		}),

		updatePost: build.mutation<IPost, IPostUpdate>({
			query: (update: IPostUpdate) => ({
				url: `/post/${update.id}`,
				method: 'PUT',
				body: update,
			}),
			invalidatesTags: ['Post'],
		}),

		deletePost: build.mutation<null, {}>({
			query: (id: string) => ({
				url: `/post/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

export const {
	useCreatePostMutation,
	useFetchAllPostsQuery,
	useUpdatePostMutation,
	useDeletePostMutation,
	useFetchPostsPaginationQuery,
	useLazyFetchPostsPaginationQuery,
} = postApi;
