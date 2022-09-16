import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDeleteCategoryMutation, useFetchAllCategoriesQuery } from 'src/services/category.api';
import { ICategory, ICategoryDelete } from 'src/types/category/category.interface';
import { IFormDefault } from './form-default.interface';
import './forms.scss';

interface IDeleteCategoryFormProps extends IFormDefault {
	category: ICategory | null;
}

const DeleteCategoryForm: React.FC<IDeleteCategoryFormProps> = ({ category, closeModal }) => {
	const { refetch } = useFetchAllCategoriesQuery({});
	const [deleteCategory, { isSuccess }] = useDeleteCategoryMutation({});

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess, closeModal]);

	const formik = useFormik<ICategoryDelete>({
		initialValues: {
			id: category!._id,
			name: category!.name,
			parentId: category!.parentId,
		},
		onSubmit: async (values: ICategoryDelete) => {
			await deleteCategory(values.id);
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
					onChange={formik.handleChange}
					disabled
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="name">
					name
				</label>
				<input
					className="form__input--input"
					id="name"
					type="text"
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
					disabled
				/>
			</div>
			<div className="form__input--wrapper">
				<label className="form__input--label" htmlFor="parentId">
					parentId
				</label>
				<input
					className="form__input--input"
					id="parentId"
					name="parentId"
					value={formik.values.parentId || ''}
					onChange={formik.handleChange}
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

export default DeleteCategoryForm;
