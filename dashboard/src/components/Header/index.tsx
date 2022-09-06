import React from 'react';
import { useNavigate } from 'react-router';
import appManager from 'src/helpers/app.manager';
import './header.scss';

const Header = () => {
	let navigate = useNavigate();

	const handleClickLogo = () => {
		appManager.resetSelectedCategory();
		navigate(`/`);
	};

	return (
		<header className="header">
			<div className="header-wrapper content">
				<div className="header__logo" onClick={handleClickLogo}>
					DASHBOARD
				</div>

				<input type="text" className="header__search" placeholder="search"></input>
			</div>
		</header>
	);
};

export default Header;
