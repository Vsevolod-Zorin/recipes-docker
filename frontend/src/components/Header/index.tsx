import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
	return (
		<header className="header">
			<div className="header-wrapper content">
				<div className="header__logo">header</div>
				<nav className="header__nav">
					<button>recipes</button>
					<button>posts</button>
				</nav>

				<input type="text" className="header__search" placeholder="search"></input>
			</div>
		</header>
	);
};

export default Header;
