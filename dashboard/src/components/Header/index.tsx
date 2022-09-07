import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import appManager from 'src/helpers/app.manager';
import './header.scss';

const Header = () => {
	let navigate = useNavigate();
	const listMenu = ['categories', 'recipes', 'posts'];

	const handleClickLogo = () => {
		appManager.resetSelectedCategory();
		navigate(`/`);
	};

	const renderMenu = () => {
		return listMenu.map((el, index) => (
			<li key={`menu-item-${index}`} className="list__item--wrapper">
				<NavLink to={`/${el}`}>{el}</NavLink>
			</li>
		));
	};

	return (
		<header className="header">
			<div className="header-wrapper content">
				<div className="header__logo" onClick={handleClickLogo}>
					DASHBOARD
				</div>

				<nav className="header__menu">
					<ul>{renderMenu()}</ul>
				</nav>

				<input type="text" className="header__search" placeholder="search"></input>
			</div>
		</header>
	);
};

export default Header;
