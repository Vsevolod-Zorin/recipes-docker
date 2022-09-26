import React, { useMemo } from 'react';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { IPost } from 'src/types/post/post.interface';
import './post-list-item.scss';

interface IPostItemProps {
	post: IPost;
}

// todo rename
const PostItem: React.FC<IPostItemProps> = ({ post }) => {
	const { description, title, categoryId } = post;
	const { data } = useFetchAllCategoriesQuery({});

	const categoryName = useMemo(() => {
		const category = data?.cellsList.find(el => el._currentCategory?._id === categoryId);
		return category?._currentCategory?.name;
	}, [data, categoryId]);

	return (
		<div className="post__list-item">
			<div className="post__list-item--title">
				<span>title: </span>
				{title}
			</div>
			<div className="post__list-item--description">
				<span>description: </span> {description}
			</div>
			<div className="post__list-item--body">
				<span>body: </span> {description}
			</div>
			<div className="post__list-item--category">
				<span>category: </span> {categoryName}
			</div>
			<div className="post__list-item--updated">
				<span>updated: </span> {new Date(post.updatedAt!).toLocaleDateString()}
			</div>
		</div>
	);
};

export default PostItem;
