import React from 'react';
import styles from './CallToAction.module.css';
import catImage from '../../assets/cat-crew.png';
import scratchImage from '../../assets/scratch.png';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next'; // <-- 1. Importamos el hook

const CallToAction = () => {
  const { theme } = useTheme();
  const { t } = useTranslation(); // <-- 2. Obtenemos la función de traducción
  const themeClass = theme === 'dark' ? styles.dark : '';

  return (
    <section className={`${styles.cta} ${themeClass}`}>
      <img
        src={catImage}
        alt={t('cta_alt_cats')} // <-- 3. Aplicamos las traducciones
        className={styles.cta__cats}
      />
      <div className={styles['cta__text-box']}>
        <p className={styles.cta__text}>{t('cta_text')}</p>
        <h2 className={styles.cta__heading}>{t('cta_heading')}</h2>
        <img
          src={scratchImage}
          alt={t('cta_alt_scratch')}
          className={styles.cta__scratch}
        />
      </div>
    </section>
  );
};

export default CallToAction;