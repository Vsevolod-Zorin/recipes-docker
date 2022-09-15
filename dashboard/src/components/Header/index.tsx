import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import appManager from 'src/helpers/app.manager';
import './header.scss';

const Header = () => {
	let navigate = useNavigate();
	const refBtnRecipes = useRef<HTMLButtonElement>(null);
	const refBtnPosts = useRef<HTMLButtonElement>(null);

	const handleClickLogo = () => {
		appManager.resetSelectedCategory();
		navigate(`/`);
	};

	const handleClickRecipeBtn = () => {
		refBtnRecipes.current?.classList.add('active');
		refBtnPosts.current?.classList.remove('active');
		// todo: redux?
		appManager.resourceType = 'recipe';
		if (appManager.selectCategoryId) {
			navigate(`/category/${appManager.selectCategoryId}/${appManager.resourceType}`);
		} else {
			navigate(`/`);
		}
	};
	const handleClickPostBtn = () => {
		refBtnRecipes.current?.classList.remove('active');
		refBtnPosts.current?.classList.add('active');
		appManager.resourceType = 'post';
		if (appManager.selectCategoryId) {
			navigate(`/category/${appManager.selectCategoryId}/${appManager.resourceType}`);
		} else {
			navigate(`/`);
		}
	};

	return (
		<header className="header">
			<div className="header-wrapper content">
				<div className="header__logo" onClick={handleClickLogo}>
					DASHBOARD
				</div>

				<nav className="header__menu">
					<nav className="header__nav">
						<button
							ref={refBtnRecipes}
							className="btn btn__header active"
							onClick={handleClickRecipeBtn}
						>
							recipes
						</button>
						<button ref={refBtnPosts} className="btn  btn__header" onClick={handleClickPostBtn}>
							posts
						</button>
					</nav>
				</nav>

				{/* <input type="text" className="header__search" placeholder="search"></input> */}
			</div>
		</header>
	);
};

export default Header;
