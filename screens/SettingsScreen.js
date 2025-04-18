import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { setLanguage } from '../src/i18n';
import { theme } from '../src/theme';
import AccessibleTouchable from '../src/components/AccessibleTouchable';
import audioHaptics from '../src/services/audioHaptics';

export default function SettingsScreen() {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedMode = await AsyncStorage.getItem('accessibilityMode');
      setAccessibilityMode(savedMode === 'true');
      
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const toggleAccessibilityMode = async (value) => {
    try {
      await AsyncStorage.setItem('accessibilityMode', value.toString());
      setAccessibilityMode(value);
      if (value) {
        await audioHaptics.speak(i18n.t('settings.accessibilityOn'), currentLanguage);
      }
    } catch (error) {
      console.error('Error saving accessibility mode:', error);
    }
  };

  const changeLanguage = async (lang) => {
    try {
      await setLanguage(lang);
      setCurrentLanguage(lang);
      if (accessibilityMode) {
        await audioHaptics.speak(i18n.t('settings.language'), lang);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('settings.title')}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.language')}</Text>
        <View style={styles.languageButtons}>
          <AccessibleTouchable
            style={[
              styles.languageButton,
              currentLanguage === 'en' && styles.selectedLanguage
            ]}
            onPress={() => changeLanguage('en')}
            soundDescription="English"
            isAccessibilityModeOn={accessibilityMode}
          >
            <Text style={styles.buttonText}>English</Text>
          </AccessibleTouchable>

          <AccessibleTouchable
            style={[
              styles.languageButton,
              currentLanguage === 'fr' && styles.selectedLanguage
            ]}
            onPress={() => changeLanguage('fr')}
            soundDescription="Français"
            isAccessibilityModeOn={accessibilityMode}
          >
            <Text style={styles.buttonText}>Français</Text>
          </AccessibleTouchable>

          <AccessibleTouchable
            style={[
              styles.languageButton,
              currentLanguage === 'el' && styles.selectedLanguage
            ]}
            onPress={() => changeLanguage('el')}
            soundDescription="Ελληνικά"
            isAccessibilityModeOn={accessibilityMode}
          >
            <Text style={styles.buttonText}>Ελληνικά</Text>
          </AccessibleTouchable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.accessibility')}</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={accessibilityMode}
            onValueChange={toggleAccessibilityMode}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={accessibilityMode ? theme.colors.secondary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
          <Text style={styles.switchLabel}>
            {accessibilityMode ? i18n.t('settings.accessibilityOn') : i18n.t('settings.accessibilityOff')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  section: {
    marginBottom: theme.spacing.large,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    width: '30%',
  },
  selectedLanguage: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.small,
  },
  switchLabel: {
    marginLeft: theme.spacing.medium,
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
});
