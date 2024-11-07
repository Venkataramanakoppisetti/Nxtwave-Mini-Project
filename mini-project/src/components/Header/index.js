import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import searchIcon from '../../Assets/search-icon.png';
import avatarIcon from '../../Assets/Avatar-icon.png';
import hamburgerIcon from '../../Assets/hamburger-icon.png';
import closeIcon from '../../Assets/close.png';
import './index.css';

const Header = ({ getSearchMoviesData }) => {
  const location = useLocation();
  const [isDropDownOpen, setDropDownStatus] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const onOpeningDropdown = () => {
    setDropDownStatus(!isDropDownOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== '') {
      getSearchMoviesData(searchTerm);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

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
          {/* Conditionally render search based on the route */}
          {location.pathname !== '/account' && location.pathname !== '/popular' && (
            <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
              {isSearchOpen ? (
                <>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search movies..."
                    className="search-input"
                  />
                  <button 
                    type="button" 
                    className="search-button"
                    onClick={handleSearchClick}
                  >
                    Search
                  </button>
                </>
              ) : (
                <img 
                  src={searchIcon} 
                  alt="search" 
                  className="search-icon" 
                  onClick={toggleSearch}
                />
              )}
            </div>
          )}
          <Link to={'/account'}>
            <img src={avatarIcon} alt="avatar" className="avatar-icon" />
          </Link>
        </div>
      </nav>

      <nav className="nav-mobile-header-container">
        <div className="logo-container">
          <Link to={"/"}>
            <img 
              src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662296727/Movies_Logo_vr3wvf.png" 
              alt="Logo" 
              className="web-logo" 
            />
          </Link>
        </div>
        <div className="search-hamburger-container">
          {location.pathname !== '/account' && location.pathname !== '/popular' && !location.pathname.startsWith('/movies/') && (
            <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
              {isSearchOpen ? (
                <>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search movies..."
                    className="search-input"
                  />
                  <button 
                    type="button" 
                    className="search-button"
                    onClick={handleSearchClick}
                  >
                    Search
                  </button>
                </>
              ) : (
                <img 
                  src={searchIcon} 
                  alt="search" 
                  className="search-icon" 
                  onClick={toggleSearch}
                />
              )}
            </div>
          )}
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
};

export default Header;
