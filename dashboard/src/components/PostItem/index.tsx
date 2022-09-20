import React, { useMemo } from 'react';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { IPost } from 'src/types/post/post.interface';
import './post-item.scss';

interface IPostItemProps {
	post: IPost;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
	const { description, title, body, categoryId } = post;
	const { data } = useFetchAllCategoriesQuery({});

	// todo selector
	const categoryName = useMemo(() => {
		const category = data?.cellsList.find(el => el._currentCategory?._id === categoryId);
		return category?._currentCategory?.name;
	}, [data, categoryId]);

	return (
		<div className="post post__item">
			<div className="post__item--title">
				<span>title: </span>
				{title}
			</div>
			<div className="post__item--description">
				<span>description: </span> {description}
			</div>
			<div className="post__item--description">
				<span>body: </span> {body}
			</div>
			<div className="post__item--category">
				<span>category: </span> {categoryName}
			</div>
			<div className="post__list-item--updated">
				<span>updated: </span> {new Date(post.updatedAt!).toLocaleDateString()}
			</div>
		</div>
	);
};

export default PostItem;
