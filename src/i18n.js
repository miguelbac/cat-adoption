import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ['es', 'en'],
    fallbackLng: 'es',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    debug: true,
    interpolation: {
      escapeValue: false, // React ya previene ataques XSS
    },
  });

export default i18n;