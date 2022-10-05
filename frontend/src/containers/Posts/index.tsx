import React from 'react';
import PostsList from 'src/components/PostsList';
import './posts.scss';

const Posts = () => {
	return (
		<div className="posts posts-wrapper ">
			<section className="posts__left-part custom-scroll">
				<h1>posts List </h1>
				<PostsList />
			</section>
		</div>
	);
};

export default Posts;
