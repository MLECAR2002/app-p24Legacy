import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SETTINGS: 'settings',
  ASSETS_CACHED: 'assetsCached',
  LAST_SYNC: 'lastSync'
};

class StorageService {
  async initializeApp() {
    try {
      // Check if this is the first launch
      const isInitialized = await AsyncStorage.getItem(STORAGE_KEYS.ASSETS_CACHED);
      
      if (!isInitialized) {
        // Set default settings
        await this.saveSettings({
          language: 'en',
          accessibilityMode: false,
          soundEnabled: true,
          vibrationsEnabled: true
        });

        // Mark assets as cached
        await AsyncStorage.setItem(STORAGE_KEYS.ASSETS_CACHED, 'true');
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
      }

      return true;
    } catch (error) {
      console.error('Error initializing storage:', error);
      return false;
    }
  }

  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }

  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  }

  async updateSetting(key, value) {
    try {
      const settings = await this.getSettings();
      if (settings) {
        settings[key] = value;
        await this.saveSettings(settings);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  }

  async clearStorage() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
}

export default new StorageService();
