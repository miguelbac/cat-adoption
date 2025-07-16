import React from 'react';
import styles from './CallToAction.module.css';
import catImage from '../../assets/cat-crew.png';
import scratchImageEs from '../../assets/scratch.png';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const CallToAction = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  console.log('Idioma actual en CallToAction:', i18n.language);
  const themeClass = theme === 'dark' ? styles.dark : '';


  const currentScratchImage = scratchImageEs;

  return (
    <section className={`${styles.cta} ${themeClass}`}>
      <img
        src={catImage}
        alt={t('cta_alt_cats')}
        className={styles.cta__cats}
      />
      <div className={styles['cta__text-box']}>
        <p className={styles.cta__text}>{t('cta_text')}</p>
        <h2 className={styles.cta__heading}>{t('cta_heading')}</h2>
        <img
          src={currentScratchImage}
          alt={t('cta_alt_scratch')}
          className={styles.cta__scratch}
        />
      </div>
    </section>
  );
};

export default CallToAction;