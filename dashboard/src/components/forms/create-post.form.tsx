import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IPostCreate } from 'src/types/post/post.interface';
import { useCreatePostMutation, useFetchAllPostsQuery } from 'src/services/post.api';
import { IFormDefault } from './form-default.interface';
import './forms.scss';

interface ICreatePostFormProps extends IFormDefault {
	categoryId: string;
}

const CreatePostForm: React.FC<ICreatePostFormProps> = ({ closeModal, categoryId }) => {
	const [createPost, { isSuccess }] = useCreatePostMutation();
	const { refetch } = useFetchAllPostsQuery(categoryId as string);

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<IPostCreate>({
		initialValues: {
			title: '',
			description: '',
			body: '',
			categoryId: categoryId!,
		},
		onSubmit: async (values: IPostCreate) => {
			await createPost(values);
			refetch();
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
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
					onChange={formik.handleChange}
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
					onChange={formik.handleChange}
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
					onChange={formik.handleChange}
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
					value={formik.values.categoryId || ''}
					onChange={formik.handleChange}
					disabled
				/>
			</div>
			<button
				className="btn btn__content--success form__btn__submit"
				type="submit"
				disabled={formik.isSubmitting}
			>
				create
			</button>
		</form>
	);
};

export default CreatePostForm;
