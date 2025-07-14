import React from 'react';
import styles from './CallToAction.module.css';
import catImage from '../../assets/cat-crew.png';
import scratchImage from '../../assets/scratch.png';
import { useTheme } from '../../hooks/useTheme';

const CallToAction = () => {
  const { theme } = useTheme();
  const themeClass = theme === 'dark' ? styles.dark : '';

  return (
    <section className={`${styles.cta} ${themeClass}`}>
      <img 
        src={catImage} 
        alt="Gatitos" 
        className={styles.cta__cats} 
      />

      <div className={styles['cta__text-box']}>
        <p className={styles.cta__text}>Sin ti, no podemos seguir adelante</p>
        <h2 className={styles.cta__heading}>HAZTE SOCIO</h2>
        <img 
          src={scratchImage} 
          alt="Rasguño decorativo" 
          className={styles.cta__scratch} 
        />
      </div>
    </section>
  );
};

export default CallToAction;