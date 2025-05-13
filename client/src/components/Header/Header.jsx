import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo_adjusted.svg';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.container}>
          <p>Sale: last chance! Up to 30% extra off selected styles!</p>
        </div>
      </div>
      
      <div className={styles.headerMain}>
        <div className={`${styles.container} ${styles.headerMainContainer}`}>
          <button className={styles.mobileMenuToggle} onClick={toggleMenu} aria-label="Toggle Menu">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logo}>
              <img src={logo} alt='JUSA' className={styles.logoImage} />
            </Link>
          </div>
          
          <nav className={`${styles.navMenuContainer} ${isMenuOpen ? styles.navMenuActive : ''}`}>
            <ul className={styles.navMenu} onClick={toggleMenu}>
              <li><Link to="/" className={styles.navLink}>HOME</Link></li>
              <li><Link to="/women" className={styles.navLink}>WOMEN</Link></li>
              <li><Link to="/men" className={styles.navLink}>MEN</Link></li>
              <li><Link to="/sale" className={styles.navLink}>SALE</Link></li>
              <li><Link to="/new-in" className={styles.navLink}>NEW IN</Link></li>
            </ul>
          </nav>
          
          <div className={styles.headerActions}>
            {/* <div className={`${styles.searchContainer} ${isSearchOpen ? styles.searchActive : ''}`}>
              <input type="text" className={styles.searchInput} placeholder="Search for items and brands" />
              <button className={styles.searchIcon} onClick={toggleSearch} aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </div> */}
            <SearchBar/>
            <div className={styles.userActions}>
              <Link to="/account" className={styles.actionButton} aria-label="Account">
                <i className="far fa-user"></i>
              </Link>
              <Link to="/bag" className={styles.actionButton} aria-label="Shopping Bag">
                <i className="fas fa-shopping-bag"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
