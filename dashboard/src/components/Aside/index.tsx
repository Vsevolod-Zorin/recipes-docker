import React, { useState } from 'react';
import CreateCategoryForm from '../forms/create-category.form';
import ModalForm from '../Modal';
import Tree from '../Tree';
import './aside.scss';

const Aside = () => {
	const [createForm, setCreateForm] = useState<boolean>(false);

	const handleClickCreate = () => {
		setCreateForm(true);
	};

	const handleCloseCreateForm = () => {
		setCreateForm(false);
	};

	return (
		<aside className="aside">
			<div className="aside-wrapper">
				<div className="aside-wrapper__header">
					<h1>categories</h1>
					<button className="aside-wrapper__header--btn-add" onClick={handleClickCreate}>
						add{' '}
					</button>
				</div>
				<nav className="aside__nav">
					<Tree isAdmin={true} />
				</nav>
				<ModalForm modalTitle="Create Category" active={createForm} setActive={setCreateForm}>
					<CreateCategoryForm closeModal={handleCloseCreateForm} />
				</ModalForm>
			</div>
		</aside>
	);
};

export default Aside;
