import React from 'react';
import { useNavigate } from 'react-router';
import appManager from 'src/helpers/app.manager';
import './header.scss';

const Header = () => {
	let navigate = useNavigate();

	const handleClickLogo = () => {
		appManager.selectCategoryId = '';
		navigate(`/`);
	};
	// todo make constants
	const handleClickRecipeBtn = () => {
		appManager.resourceType = 'recipe';
		if (appManager.selectCategoryId) {
			navigate(`/category/${appManager.selectCategoryId}/${appManager.resourceType}`);
		} else {
			navigate(`/recipes`);
		}
	};
	const handleClickPostBtn = () => {
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
					header
				</div>
				<nav className="header__nav">
					<button onClick={handleClickRecipeBtn}>recipes</button>
					<button onClick={handleClickPostBtn}>posts</button>
				</nav>

				<input type="text" className="header__search" placeholder="search"></input>
			</div>
		</header>
	);
};

export default Header;
