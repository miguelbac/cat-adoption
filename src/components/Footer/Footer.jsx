import React from 'react';
import styles from './Footer.module.css';
// Importa los iconos de las redes sociales
import locationIcon from '../../assets/maps.png';
import youtubeIcon from '../../assets/Youtube.png';
import instagramIcon from '../../assets/Instagram.png';
import facebookIcon from '../../assets/Facebook.png';
import twitterIcon from '../../assets/Twitter.png';   
import tiktokIcon from '../../assets/Tiktok.png';

const socialLinks = [
  { id: 'location', href: '#', icon: locationIcon, label: 'Ubicación' },
  { id: 'youtube', href: '#', icon: youtubeIcon, label: 'YouTube' },
  { id: 'instagram', href: '#', icon: instagramIcon, label: 'Instagram' },
  { id: 'facebook', href: '#', icon: facebookIcon, label: 'Facebook' },
  { id: 'twitter', href: '#', icon: twitterIcon, label: 'Twitter' },
  { id: 'tiktok', href: '#', icon: tiktokIcon, label: 'TikTok' },
];



const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.legalLinks}>
        <a href="#">Contacto</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Aviso legal</a>
      </div>

      {/* Dibuja los iconos usando .map() */}
      <div className={styles.socialIcons}>
  {socialLinks.map((link) => (
    <a key={link.id} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
      <img src={link.icon} alt={link.label} className={styles.socialIconImage} />
    </a>
  ))}
</div>
    </footer>
  );
};

export default Footer;