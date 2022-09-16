import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import appManager from 'src/utils/app.manager';
import './header.scss';

const Header = () => {
	let navigate = useNavigate();
	const refBtnRecipes = useRef<HTMLDivElement>(null);
	const refBtnPosts = useRef<HTMLDivElement>(null);

	const handleClickLogo = () => {
		appManager.resetSelectedCategory();
		navigate(`/`);
	};
	// todo make constants
	const handleClickRecipeBtn = () => {
		refBtnRecipes.current?.classList.add('active');
		refBtnPosts.current?.classList.remove('active');
		appManager.resourceType = 'recipe';
		if (appManager.selectCategoryId) {
			navigate(`/category/${appManager.selectCategoryId}/${appManager.resourceType}`);
		} else {
			navigate(`/recipes`);
		}
	};
	const handleClickPostBtn = () => {
		refBtnRecipes.current?.classList.remove('active');
		refBtnPosts.current?.classList.add('active');
		appManager.resourceType = 'post';
		if (appManager.selectCategoryId) {
			navigate(`/category/${appManager.selectCategoryId}/${appManager.resourceType}`);
		} else {
			navigate(`/posts`);
		}
	};

	return (
		<header className="header">
			<div className="header-wrapper content">
				<div className="header__logo" onClick={handleClickLogo}>
					CLIENT
				</div>

				<nav className="header__nav">
					<div
						ref={refBtnRecipes}
						className="btn btn__header header__nav--btn active"
						onClick={handleClickRecipeBtn}
					>
						recipes
					</div>
					<div
						ref={refBtnPosts}
						className="btn  btn__header header__nav--btn"
						onClick={handleClickPostBtn}
					>
						posts
					</div>
				</nav>

				{/* <input type="text" className="header__search" placeholder="search"></input> */}
			</div>
		</header>
	);
};

export default Header;
