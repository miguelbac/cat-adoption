import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import menuButton from '../../assets/hmenu.png';
import closeIcon from '../../assets/cerrar.png';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header__section-left']}>
          <Link to="/">
            <img src={logo} alt="Logo de Adopta un Michi" className={styles.header__logo} />
          </Link>
        </div>

        <div className={styles['header__section-center']}>
          <h1 className={styles.header__title}>ADOPTA UN MICHI</h1>
        </div>

        <div className={styles['header__section-right']}>
          <button
            className={styles['header__menu-button']}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={isOpen ? closeIcon : menuButton}
              alt="Icono del menú"
              className={styles.header__icon}
            />
          </button>
        </div>
      </header>

      <nav className={`${styles['nav-menu']} ${isOpen ? styles['nav-menu--open'] : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>Inicio</Link>
        <Link to="/adopt" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>Adoptar</Link>
        <Link to="/mapa" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>Mapa</Link>
      </nav>
    </>
  );
};

export default Header;