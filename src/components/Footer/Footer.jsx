import React from 'react';
import styles from './Footer.module.css';

import locationIcon from '../../assets/maps.png';
import youtubeIcon from '../../assets/Youtube.png';
import instagramIcon from '../../assets/Instagram.png';
import facebookIcon from '../../assets/Facebook.png';
import twitterIcon from '../../assets/Twitter.png';
import tiktokIcon from '../../assets/Tiktok.png';

const socialLinks = [
  { id: 'location', href: 'https://www.google.com/maps/search/?api=1&query=43.5456,-5.6615', icon: locationIcon, label: 'Ubicación' },
  { id: 'youtube', href: '#', icon: youtubeIcon, label: 'YouTube' },
  { id: 'instagram', href: '#', icon: instagramIcon, label: 'Instagram' },
  { id: 'facebook', href: '#', icon: facebookIcon, label: 'Facebook' },
  { id: 'twitter', href: '#', icon: twitterIcon, label: 'Twitter' },
  { id: 'tiktok', href: '#', icon: tiktokIcon, label: 'TikTok' },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__legal}>
        <a href="#" className={styles.footer__link}>Contacto</a>
        <a href="#" className={styles.footer__link}>Política de privacidad</a>
        <a href="#" className={styles.footer__link}>Aviso legal</a>
      </div>

      <div className={styles.footer__social}>
        {socialLinks.map((link) => (
          <a key={link.id} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer" className={styles['footer__social-link']}>
            <img src={link.icon} alt={link.label} className={styles['footer__social-icon']} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;