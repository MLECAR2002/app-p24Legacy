import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from '../src/i18n';
import { theme } from '../src/theme';
import AccessibleTouchable from '../src/components/AccessibleTouchable';
import audioHaptics from '../src/services/audioHaptics';

export default function ThankYouScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const speakThankYou = async () => {
      await audioHaptics.speak(i18n.t('survey.thankYouMessage'), i18n.locale);
    };
    speakThankYou();
  }, []);

  const handleRestart = async () => {
    await audioHaptics.playWhistle();
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('survey.thankYou')}</Text>
      
      <Text style={styles.message}>
        {i18n.t('survey.thankYouMessage')}
      </Text>

      <AccessibleTouchable
        style={styles.button}
        onPress={handleRestart}
        soundDescription={i18n.t('survey.playAgain')}
        isAccessibilityModeOn={true}
        language={i18n.locale}
      >
        <Text style={styles.buttonText}>
          {i18n.t('survey.playAgain')}
        </Text>
      </AccessibleTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  message: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xlarge,
    lineHeight: 24,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    width: '80%',
    marginTop: theme.spacing.large,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
  },
});
