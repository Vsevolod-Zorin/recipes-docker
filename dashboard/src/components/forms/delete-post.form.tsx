import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IPost, IPostDelete } from 'src/types/post/post.interface';
import { useDeletePostMutation, useFetchAllPostsQuery } from 'src/services/post.api';
import { IFormDefault } from './form-default.interface';
import './forms.scss';

interface IDeletePostFormProps extends IFormDefault {
	post: IPost;
}

const DeletePostForm: React.FC<IDeletePostFormProps> = ({ post, closeModal }) => {
	const { refetch } = useFetchAllPostsQuery(post.categoryId as string);

	const [deletePost, { isSuccess }] = useDeletePostMutation();

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<IPostDelete>({
		initialValues: {
			id: post._id,
			title: post.title,
			description: post.description,
			body: post.body,
			categoryId: post.categoryId,
		},
		onSubmit: async (values: IPostDelete) => {
			await deletePost(values.id);
			refetch();
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="id">
					id
				</label>
				<input
					className="form__input--input"
					id="id"
					type="text"
					name="id"
					value={formik.values.id}
					disabled
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="title">
					title
				</label>
				<input
					className="form__input--input"
					id="title"
					type="text"
					name="title"
					value={formik.values.title}
					disabled
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="description">
					description
				</label>
				<textarea
					className="form__input--input"
					id="description"
					name="description"
					value={formik.values.description}
					disabled
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="body">
					body
				</label>
				<textarea
					className="form__input--input"
					id="body"
					name="body"
					value={formik.values.body}
					disabled
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="categoryId">
					category Id
				</label>
				<input
					className="form__input--input"
					id="categoryId"
					type="text"
					name="categoryId"
					value={formik.values.categoryId}
					disabled
				/>
			</div>
			<button
				className="btn btn__content--success form__btn__submit"
				type="submit"
				disabled={formik.isSubmitting}
			>
				delete
			</button>
		</form>
	);
};

export default DeletePostForm;
