import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { IPostCreate } from 'src/types/post/post.interface';
import { useCreatePostMutation, useFetchAllPostsQuery } from 'src/services/post.api';
import { IFormDefault } from './form-default.interface';
import FormTextInput from './parts/form-text.input';
import FormTextAreaInput from './parts/form-textarea.input';
import { CreatePostSchema } from './parts/validation';
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
		validationSchema: CreatePostSchema,
		onSubmit: async (values: IPostCreate) => {
			await createPost(values);
			refetch();
		},
	});

	return (
		<form className="form form-wrapper" onSubmit={formik.handleSubmit}>
			<FormTextInput
				label="title"
				name="title"
				placeholder="title"
				onChange={formik.handleChange}
				value={formik.values.title}
				errorMessage={formik.errors.title}
				touched={formik.touched.title}
				required={true}
			/>
			<FormTextAreaInput
				label="description"
				name="description"
				placeholder="description"
				onChange={formik.handleChange}
				value={formik.values.description}
				errorMessage={formik.errors.description}
				touched={formik.touched.description}
				required={true}
			/>
			<FormTextAreaInput
				label="body"
				name="body"
				placeholder="body"
				onChange={formik.handleChange}
				value={formik.values.body}
				errorMessage={formik.errors.body}
				touched={formik.touched.body}
				required={true}
			/>
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
