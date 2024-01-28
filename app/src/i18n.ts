import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as enCommon from 'locales/en/common.json';

console.log(enCommon);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: {
  'barbellcurl': "Barbell curl",
  'barbellbenchpress': "Barbell bench press",
  'barbellhipthrust': "Barbell hip thrust"
      } },
    },
    fallbackLng: 'en',
    ns: ['common'],
    fallbackNS: 'common',
    defaultNS: 'common',
  });

export default i18n;
