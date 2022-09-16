import React, { useEffect } from 'react';
import appManager from 'src/utils/app.manager';
import './posts.scss';

const Posts = () => {
	useEffect(() => {
		if (appManager.selectCategoryId) {
			// fetch by category
		} else {
			// fetch all
		}
	}, []);

	useEffect(() => {
		if (appManager.selectCategoryId) {
			// fetch by category
		} else {
			// fetch all
		}
	}, []);
	return (
		<div>
			<h1>Posts</h1>
		</div>
	);
};

export default Posts;
