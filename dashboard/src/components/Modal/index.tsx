import React from 'react';
import './modal.scss';

interface IModalProp {
	active: boolean;
	setActive: (state: boolean) => void;
	modalTitle: string;
	children: JSX.Element;
}

const ModalForm: React.FC<IModalProp> = ({ active, setActive, modalTitle, children }) => {
	return (
		<>
			<div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
				<div
					className={active ? 'modal__content active' : 'modal__content'}
					onClick={e => e.stopPropagation()}
				>
					<h1 className="modal__content__title">{modalTitle}</h1>
					<div className="modal__content__form">{children}</div>
				</div>
			</div>
		</>
	);
};

export default ModalForm;
