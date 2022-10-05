import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { useFetchPostByIdQuery } from 'src/services/post.api';
import './post.scss';

const Post = () => {
	const { postId, categoryId } = useParams();
	const { data: post } = useFetchPostByIdQuery(postId as string);

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
