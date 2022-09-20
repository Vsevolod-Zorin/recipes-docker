import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { appActions } from 'src/store/reducers/app.slice';
import { selectCategoryId, selectResourceType } from 'src/store/selectors';
import './header.scss';

const Header = () => {
	let navigate = useNavigate();
	const dispatch = useAppDispatch();
	const categoryId = useAppSelector(selectCategoryId);
	const resourceType = useAppSelector(selectResourceType);

	const handleClickLogo = () => {
		dispatch(appActions.setSelectedCategoryId(null));
		navigate(`/`);
	};

	const handleClickRecipeBtn = useCallback(() => {
		const resourceType = 'recipe';
		dispatch(appActions.setResourceType(resourceType));

		if (categoryId) {
			navigate(`/category/${categoryId}/${resourceType}`);
		} else {
			navigate(`/recipes`);
		}
	}, [categoryId, dispatch, navigate]);

	const handleClickPostBtn = useCallback(() => {
		const resourceType = 'post';
		dispatch(appActions.setResourceType(resourceType));

		if (categoryId) {
			navigate(`/category/${categoryId}/${resourceType}`);
		} else {
			navigate(`/posts`);
		}
	}, [categoryId, dispatch, navigate]);

	return (
		<header className="header">
			<div className="header-wrapper content">
				<div className="header__logo" onClick={handleClickLogo}>
					DASHBOARD
				</div>

				<div className="header__menu">
					<nav className="header__nav">
						<div
							className={`btn btn__header header__menu--btn ${
								resourceType === 'recipe' ? 'active' : ''
							}`}
							onClick={handleClickRecipeBtn}
						>
							recipes
						</div>
						<div
							className={`btn  btn__header header__menu--btn ${
								resourceType === 'post' ? 'active' : ''
							}`}
							onClick={handleClickPostBtn}
						>
							posts
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
