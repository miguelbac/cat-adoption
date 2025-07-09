import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import menuButton from '../../assets/hmenu.png';
import closeIcon from '../../assets/cerrar.png'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

     useEffect(() => {
    console.log(`El menú ahora está: ${isOpen ? 'Abierto' : 'Cerrado'}`);
  }, [isOpen]);

 return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/">
            <img src={logo} alt="Logo de Adopta un Michi" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.headerCenter}>
          <h1>ADOPTA UN MICHI</h1>
        </div>

        <div className={styles.headerRight}>
          <button
            className={styles.menuButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={isOpen ? closeIcon : menuButton}
              alt="Icono del menú"
              className={styles.menuIcon}
            />
          </button>
        </div>
      </header>

      <nav className={isOpen ? `${styles.navMenu} ${styles.navMenuOpen}` : styles.navMenu}>
        <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
        <Link to="/adopt" onClick={() => setIsOpen(false)}>Adoptar</Link>
      </nav>
    </>
  );
};

export default Header;