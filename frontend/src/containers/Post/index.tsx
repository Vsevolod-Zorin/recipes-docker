import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from 'src/hooks/redux';
import { useFetchAllPostsQuery } from 'src/services/post.api';
import { categoryActions } from 'src/store/reducers/category.slice';
import './post.scss';

const Post = () => {
	const { postId, categoryId } = useParams();
	const { data } = useFetchAllPostsQuery(categoryId as string);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoryId) {
			// open tree on new page
			dispatch(categoryActions.setSelectedCell(categoryId));
		}
	}, [categoryId, dispatch]);

	// todo selector
	const post = useMemo(() => {
		const post = data?.find(el => el._id === postId);
		return post || null;
	}, [data, postId]);

	const renderPost = useCallback(() => {
		if (post && categoryId && postId) {
			return (
				<div className="post__item--wrapper">
					<h1>Post: {postId}</h1>
					<h1>category: {categoryId}</h1>
					<h1>title: {post?.title}</h1>
					<h1>description: {post?.description}</h1>
					<h1>body: {post?.body}</h1>
					<h1>updatedAt: {new Date(post.updatedAt!).toLocaleDateString()}</h1>
				</div>
			);
		}
	}, [post, categoryId, postId]);

	return <div className="post__item">{renderPost()}</div>;
};

export default Post;
