// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['welcome','home', 'auth', 'login', 'signup', 'header', 'recipe', 'about', 'footer', 'addRecipe', 'profile'], // define all namespaces
    defaultNS: 'welcome', // default if you don't specify one
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        welcome: require('../public/locales/en/welcome.json'),
        auth: require('../public/locales/en/auth.json'),
        footer: require('../public/locales/en/footer.json'),
        login: require('../public/locales/en/login.json'),
        signup: require('../public/locales/en/signup.json'),
      },
      fr: {
        welcome: require('../public/locales/fr/welcome.json'),
        auth: require('../public/locales/fr/auth.json'),
        footer: require('../public/locales/fr/footer.json'),
        login: require('../public/locales/fr/login.json'),
        signup: require('../public/locales/fr/signup.json'),
      },
    },
  });

export default i18n;
