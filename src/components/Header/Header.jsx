import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import menuButton from '../../assets/hmenu.png';
// 1. Importamos ambos iconos de 'cerrar' con nombres diferentes
import closeIconEs from '../../assets/cerrar.png';
import closeIconEn from '../../assets/cerraren.png';
import styles from './Header.module.css';
import { useTheme } from '../../hooks/useTheme';
import { BsMoonStarsFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  // 2. Obtenemos 'i18n' para saber el idioma actual
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const newThemeName = theme === 'light' ? 'oscuro' : 'claro';

  // 3. Decidimos qué icono de 'cerrar' usar según el idioma
  const currentCloseIcon = i18n.language === 'es' ? closeIconEs : closeIconEn;

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header__section-left']}>
          <Link to="/">
            <img src={logo} alt={t('header_aria_logo')} className={styles.header__logo} />
          </Link>
        </div>

        <div className={styles['header__section-center']}>
          <h1 className={styles.header__title}>{t('headerTitle')}</h1>
        </div>

        <div className={styles['header__section-right']}>
          <button
            className={styles['header__menu-button']}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t(isOpen ? 'header_aria_close_menu' : 'header_aria_open_menu')}
          >
            <img
              // 4. Usamos la variable que contiene el icono correcto
              src={isOpen ? currentCloseIcon : menuButton}
              alt={t('header_aria_menu_icon')}
              className={styles.header__icon}
            />
          </button>
          <button
            onClick={toggleTheme}
            className={styles['header__theme-icon']}
            aria-label={t('header_aria_theme_toggle', { theme: newThemeName })}
          >
            {theme === 'light' ? <BsMoonStarsFill /> : '🌞'}
          </button>
        </div>
      </header>

      <nav className={`${styles['nav-menu']} ${isOpen ? styles['nav-menu--open'] : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>{t('header_nav_home')}</Link>
        <Link to="/adopt" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>{t('header_nav_adopt')}</Link>
        <Link to="/fav" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>Favoritos</Link>
        <Link to="/map" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>{t('header_nav_map')}</Link>
        <Link to="/fav" onClick={() => setIsOpen(false)} className={styles['nav-menu__link']}>{t('header_nav_favorites')}</Link>
        <LanguageSwitcher />
      </nav>
    </>
  );
};

export default Header;