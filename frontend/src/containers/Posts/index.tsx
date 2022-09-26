import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import PostItem from 'src/components/PostlistItem';
import { useFetchAllPostsQuery } from 'src/services/post.api';
import { IPost } from 'src/types/post/post.interface';
import './posts.scss';

const Posts = () => {
	const navigate = useNavigate();
	const { categoryId } = useParams();
	// todo rename method
	const { data } = useFetchAllPostsQuery(categoryId as string);

	const handleClick = (el: IPost) => {
		navigate(`/category/${categoryId}/post/${el._id}`);
	};

	const renderList = useCallback(() => {
		if (data) {
			return data.map((el, index) => (
				<li
					className="posts__list--item"
					key={`postListItem-${index}`}
					onClick={() => handleClick(el)}
				>
					<PostItem post={el} />
				</li>
			));
		}
	}, [data]);

	return (
		<div className="posts posts-wrapper ">
			<section className="posts__left-part custom-scroll">
				<h1>posts List </h1>
				<ul className="posts__list posts__list--item">{renderList()}</ul>
			</section>
		</div>
	);
};

export default Posts;
