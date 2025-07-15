import React from 'react';
import { useTranslation } from 'react-i18next';
import Btn from '../Btn/Btn';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Btn
        label="ES"
        onClick={() => handleLanguageChange('es')}
      />
      <Btn
        label="EN"
        onClick={() => handleLanguageChange('en')}
      />
    </div>
  );
};

export default LanguageSwitcher;