import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import './post.scss';

const Post = () => {
	const { postId } = useParams();

	return (
		<div>
			<h1>Post: {postId}</h1>
		</div>
	);
};

export default Post;
