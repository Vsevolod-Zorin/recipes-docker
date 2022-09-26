import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IPost, IPostUpdate } from 'src/types/post/post.interface';
import { useFetchAllPostsQuery, useUpdatePostMutation } from 'src/services/post.api';
import { IFormDefault } from './form-default.interface';
import DropdownCategories from './parts/dropdown-categories';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import './forms.scss';

interface IEditPostFormProps extends IFormDefault {
	post: IPost | null;
}

const EditPostForm: React.FC<IEditPostFormProps> = ({ post, closeModal }) => {
	// todo error
	const [updatePost, { isSuccess }] = useUpdatePostMutation();
	const { refetch } = useFetchAllPostsQuery(post!.categoryId as string);
	const { data } = useFetchAllCategoriesQuery({});

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<IPostUpdate>({
		initialValues: {
			id: post!._id,
			title: post!.title,
			description: post!.description,
			body: post!.body,
			categoryId: post!.categoryId,
		},
		onSubmit: async (values: IPostUpdate) => {
			await updatePost(values);
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
					disabled
					className="form__input--input"
					id="id"
					type="text"
					name="id"
					value={formik.values.id}
					onChange={formik.handleChange}
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
				<label className="form__input--label" htmlFor="description">
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
				<label className="form__input--label" htmlFor="parentId">
					category
				</label>
				<DropdownCategories
					className="form__input--input"
					name="categoryId"
					categories={data?.categoriesList || []}
					cells={data?.rootCellsList || []}
					value={formik.values.categoryId || ''}
					onChange={formik.handleChange}
				/>
			</div>
			<button
				className="btn btn__content--success form__btn__submit"
				type="submit"
				disabled={formik.isSubmitting}
			>
				update
			</button>
		</form>
	);
};

export default EditPostForm;
