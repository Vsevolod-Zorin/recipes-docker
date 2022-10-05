import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import CreatePostForm from 'src/components/forms/create-post.form';
import DeletePostForm from 'src/components/forms/delete-post.form';
import EditPostForm from 'src/components/forms/edit-post.form';
import ModalForm from 'src/components/Modal';
import PostItem from 'src/components/PostItem';
import PostsList from 'src/components/PostsList';
import { useAppDispatch } from 'src/hooks/redux';
import { useFetchAllPostsQuery } from 'src/services/post.api';
import { appActions } from 'src/store/reducers/app.slice';
import { IPost } from 'src/types/post/post.interface';
import './posts.scss';

const Posts = () => {
	const { categoryId } = useParams();
	const [selectedPost, s] = useState<IPost | null>(null);
	const [createForm, setCreateForm] = useState<boolean>(false);
	const [editForm, setEditForm] = useState<boolean>(false);
	const [deleteForm, setDeleteForm] = useState<boolean>(false);
	const [isRefreshList, setIsRefreshList] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categoryId) {
			dispatch(appActions.setSelectedCategoryId(categoryId));
		}
		return setSelectedPost(null);
	}, [categoryId]);

	const setSelectedPost = useCallback((el: IPost | null) => {
		s(null);
		s(el);
	}, []);

	const handleClickCreate = () => {
		setCreateForm(true);
	};

	const handleCloseCreateModal = () => {
		setCreateForm(false);
		setIsRefreshList(true);
	};

	const handleClickEdit = () => {
		setEditForm(true);
	};

	const handleCloseEditModal = () => {
		setEditForm(false);
		setIsRefreshList(true);
	};

	const handleClickDelete = () => {
		setDeleteForm(true);
	};

	const handleCloseDeleteModal = () => {
		setDeleteForm(false);
		setIsRefreshList(true);
	};

	return (
		<div className="posts posts-wrapper ">
			<section className="posts__left-part custom-scroll">
				<h1>posts List: </h1>
				{/* <ul className="posts__list">{renderList()}</ul> */}
				<PostsList
					setSelectedPost={setSelectedPost}
					isRefreshList={isRefreshList}
					setIsRefreshList={setIsRefreshList}
				/>
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
					<CreatePostForm closeModal={handleCloseCreateModal} categoryId={categoryId!} />
				</ModalForm>
			)}
			{selectedPost && (
				<ModalForm modalTitle="Edit Post" active={editForm} setActive={setEditForm}>
					<EditPostForm closeModal={handleCloseEditModal} post={selectedPost} />
				</ModalForm>
			)}
			{selectedPost && (
				<ModalForm modalTitle="Delete Post" active={deleteForm} setActive={setDeleteForm}>
					<DeletePostForm closeModal={handleCloseDeleteModal} post={selectedPost} />
				</ModalForm>
			)}
		</div>
	);
};

export default Posts;
