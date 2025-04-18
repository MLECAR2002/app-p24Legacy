import { I18n } from 'i18n-js';
import { translations } from './translations';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const i18n = new I18n(translations);

// Fallback to English if language not supported
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Load saved language preference or use device locale
export const initializeLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      // Get device locale
      const locale = Localization.locale.split('-')[0];
      // Check if we support this language
      if (['en', 'fr', 'el'].includes(locale)) {
        i18n.locale = locale;
      } else {
        i18n.locale = 'en'; // Default to English
      }
    }
  } catch (error) {
    console.error('Error loading language:', error);
    i18n.locale = 'en';
  }
};

// Save language preference
export const setLanguage = async (language) => {
  try {
    await AsyncStorage.setItem('userLanguage', language);
    i18n.locale = language;
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export default i18n;
