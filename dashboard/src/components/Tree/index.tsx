import React, { useEffect, useCallback, useState } from 'react';
import Cell from 'src/components/Tree/parts/menu.cell';
import { openParentCells } from 'src/helpers/open-parent-cells';
import { ICell } from 'src/helpers/treeBuilder';
import { useAppSelector } from 'src/hooks/redux';
import { useFetchAllCategoriesQuery } from 'src/services/category.api';
import { selectCategoryId } from 'src/store/selectors';
import DeleteCategoryForm from '../forms/delete-category.form';
import EditCategoryForm from '../forms/edit-category.form';
import ModalForm from '../Modal';
import './tree.scss';

interface ITreeProps {
	isAdmin: boolean;
}

const Tree: React.FC<ITreeProps> = ({ isAdmin }) => {
	const { data } = useFetchAllCategoriesQuery({});
	const [editedCell, setEditedCell] = useState<ICell | null>(null);
	const [editForm, setEditForm] = useState<boolean>(false);
	const [deleteForm, setDeleteForm] = useState<boolean>(false);
	const categoryId = useAppSelector(selectCategoryId);

	useEffect(() => {
		if (categoryId && data?.cellsList) {
			openParentCells(categoryId, data?.cellsList);
		}
	}, [data, categoryId]);

	const handleClickEdit = (cell: ICell) => {
		setEditedCell(cell);
		setEditForm(true);
	};
	const handleClickDelete = (cell: ICell) => {
		setEditedCell(cell);
		setDeleteForm(true);
	};

	const handleCloseEditForm = () => {
		setEditForm(false);
	};

	const handleCloseDeleteForm = () => {
		setDeleteForm(false);
	};

	const renderTree = useCallback(() => {
		return data?.rootCellsList.map((el, index) => (
			<Cell
				key={el._currentCategory!._id + index}
				cell={el}
				isAdmin={isAdmin}
				handleClickEdit={handleClickEdit}
				handleClickDelete={handleClickDelete}
			/>
		));
	}, [data, isAdmin]);

	return (
		<div className="tree">
			{renderTree()}
			{editedCell && editForm && (
				<ModalForm modalTitle="Edit Category" active={editForm} setActive={setEditForm}>
					<EditCategoryForm
						closeModal={handleCloseEditForm}
						category={editedCell?._currentCategory}
					/>
				</ModalForm>
			)}
			{editedCell && deleteForm && (
				<ModalForm modalTitle="Delete Category" active={deleteForm} setActive={setDeleteForm}>
					<DeleteCategoryForm
						closeModal={handleCloseDeleteForm}
						category={editedCell?._currentCategory}
					/>
				</ModalForm>
			)}
		</div>
	);
};

export default Tree;
