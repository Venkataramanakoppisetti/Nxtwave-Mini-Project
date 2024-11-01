import React, { useState } from 'react'; // Import useState for managing state
import { Link } from 'react-router-dom';
import searchIcon from '../../Assets/search-icon.png';
import avatarIcon from '../../Assets/Avatar-icon.png';
import hamburgerIcon from '../../Assets/hamburger-icon.png';
import closeIcon from '../../Assets/close.png';
import { BiSolidCameraMovie } from "react-icons/bi";
import './index.css';

const Header = () => {
    const [isDropDownOpen, setDropDownStatus] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false); // State for search input
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const onOpeningDropdown = () => {
        setDropDownStatus(!isDropDownOpen);
    }

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchTerm(''); // Clear search term when closing
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
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
                    <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search movies..."
                            className="search-input"
                        />
                        <img 
                            src={searchIcon} 
                            alt="search" 
                            className="search-icon" 
                            onClick={toggleSearch}
                        />
                    </div>
                    <Link to={'/account'}>
                        <img src={avatarIcon} alt="avatar" className="avatar-icon" />
                    </Link>
                </div>
            </nav>
            <nav className="nav-mobile-header-container">
                <div className="logo-container">
                    <Link to={"/"}>
                        <BiSolidCameraMovie size={30} color='red' />
                    </Link>
                </div>
                <div className="search-hamburger-container">
                    <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search movies..."
                            className="search-input"
                        />
                        <img 
                            src={searchIcon} 
                            alt="search" 
                            className="search-icon" 
                            onClick={toggleSearch}
                        />
                    </div>
                    <button className='hamburger-button' onClick={onOpeningDropdown}>
                        <img 
                            src={hamburgerIcon} 
                            alt="hamburger icon" 
                            className="hamburger-icon"
                        />
                    </button>
                </div>
            </nav>
            <div className={`drop-down-container ${isDropDownOpen ? 'open' : ''}`}>
                <ul className='drop-down-nav-links'>
                    <li className='drop-navs'><Link to="/">Home</Link></li>
                    <li className='drop-navs'><Link to="/popular">Popular</Link></li>
                    <li className='drop-navs'><Link to="/account">Account</Link></li>
                </ul>
                <button className='close-button' onClick={onOpeningDropdown}>
                    <img src={closeIcon} alt="close icon" className="drop-down-close-icon" />
                </button>
            </div>
        </>
    );
}

export default Header;
