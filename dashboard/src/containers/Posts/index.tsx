import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import CreatePostForm from 'src/components/forms/create-post.form';
import DeletePostForm from 'src/components/forms/delete-post.form';
import EditPostForm from 'src/components/forms/edit-post.form';
import ModalForm from 'src/components/Modal';
import PostItem from 'src/components/PostItem';
import { useAppDispatch } from 'src/hooks/redux';
import { useFetchAllPostsQuery } from 'src/services/post.api';
import { appActions } from 'src/store/reducers/app.slice';
import { IPost } from 'src/types/post/post.interface';
import './posts.scss';

const Posts = () => {
	const { categoryId } = useParams();
	const { data } = useFetchAllPostsQuery(categoryId as string);

	const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
	const [createForm, setCreateForm] = useState<boolean>(false);
	const [editForm, setEditForm] = useState<boolean>(false);
	const [deleteForm, setDeleteForm] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoryId) {
			dispatch(appActions.setSelectedCategoryId(categoryId));
		}
		return setSelectedPost(null);
	}, [categoryId]);

	const renderList = useCallback(() => {
		if (data) {
			return data.map((el, index) => (
				<li
					className="posts__list--item"
					key={`postListItem-${index}`}
					onClick={() => setSelectedPost(el)}
				>
					<PostItem post={el} />
				</li>
			));
		}
	}, [data]);

	const handleClickCreate = () => {
		setCreateForm(true);
	};

	const handleClickEdit = () => {
		setEditForm(true);
	};

	const handleClickDelete = () => {
		setDeleteForm(true);
	};

	return (
		<div className="posts posts-wrapper ">
			<section className="posts__left-part custom-scroll">
				<h1>posts List: </h1>
				<ul className="posts__list">{renderList()}</ul>
			</section>
			<section className="posts__right-part">
				<div className="right-part__wrapper">
					<div className="right-part__controls">
						<button className="btn" onClick={handleClickCreate}>
							add
						</button>

						<button className="btn" onClick={handleClickEdit} disabled={!selectedPost}>
							edit
						</button>
						<button className="btn" onClick={handleClickDelete} disabled={!selectedPost}>
							delete
						</button>
					</div>
					<div className="right-part__preview">
						<span>preview</span>
						{selectedPost && <PostItem post={selectedPost} />}
					</div>
				</div>
			</section>
			{createForm && (
				<ModalForm modalTitle="Create Post" active={createForm} setActive={setCreateForm}>
					<CreatePostForm closeModal={() => setCreateForm(false)} categoryId={categoryId!} />
				</ModalForm>
			)}
			{selectedPost && (
				<ModalForm modalTitle="Edit Post" active={editForm} setActive={setEditForm}>
					<EditPostForm closeModal={() => setEditForm(false)} post={selectedPost} />
				</ModalForm>
			)}
			{selectedPost && (
				<ModalForm modalTitle="Delete Post" active={deleteForm} setActive={setDeleteForm}>
					<DeletePostForm closeModal={() => setDeleteForm(false)} post={selectedPost} />
				</ModalForm>
			)}
		</div>
	);
};

export default Posts;
