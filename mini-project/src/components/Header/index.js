import React from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../Assets/search-icon.png';
import avatarIcon from '../../Assets/Avatar-icon.png';
import './index.css';

const Header = () => {
    return (
        <nav className='nav-header-container'>
            <div className="first-container">
                <div className="logo-container">
                    <Link to={"/"}>
                        <img 
                            src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662296727/Movies_Logo_vr3wvf.png" 
                            alt="Logo" 
                            className="web-logo" 
                        />
                    </Link>
                </div>
                <ul className="home-popular-container">
                    <li>
                        <Link to={'/'} className='nav-link'>Home</Link>
                    </li>
                    <li>
                        <Link to={'/popular'} className='nav-link'>Popular</Link>
                    </li>
                </ul>
            </div>
            
            <div className="account-search-container">
                <img src={searchIcon} alt="search" className="search-icon" />
                <Link to={'/account'}>
                    <img src={avatarIcon} alt="avatar" className="avatar-icon" />
                </Link>
            </div>
        </nav>
    )
}

export default Header;
