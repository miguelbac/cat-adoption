import React from 'react';
import styles from './CallToAction.module.css';
import catImage from '../../assets/cat-crew.png';
import scratchImage from '../../assets/scratch.png';

const CallToAction = () => {
  return (
     <section className={styles.cta}>
      <img
        src={catImage}
        alt="Gatitos de la protectora"
        className={styles.cta__cats}
      />
      <div className={styles['cta__text-box']}>
        <p className={styles.cta__text}>Sin ti, no podemos seguir adelante</p>
        <h2 className={styles.cta__heading}>HAZTE SOCIO</h2>
        {/* El rasguño va aquí DENTRO */}
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