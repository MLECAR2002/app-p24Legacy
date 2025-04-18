import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from '../src/i18n';
import { theme } from '../src/theme';
import { questions } from '../src/data/questions';
import AccessibleTouchable from '../src/components/AccessibleTouchable';
import audioHaptics from '../src/services/audioHaptics';

export default function GameScreen() {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

  useEffect(() => {
    const readCurrentQuestion = async () => {
      if (isAccessibilityMode) {
        const currentQ = questions[i18n.locale][currentQuestion];
        await audioHaptics.speak(currentQ.question, i18n.locale);
      }
    };
    readCurrentQuestion();
  }, [currentQuestion, isAccessibilityMode]);

  const handleAnswer = async (answer) => {
    const currentQ = questions[i18n.locale][currentQuestion];
    const isCorrect = answer === currentQ.correctAnswer;

    if (isCorrect) {
      await audioHaptics.playGoal();
      setScore(score + 1);
    } else {
      await audioHaptics.playSave();
    }

    // Si c'est la dernière question
    if (currentQuestion === questions[i18n.locale].length - 1) {
      setGameEnded(true);
      await audioHaptics.playWhistle();
      // Rediriger vers le questionnaire avec le score
      navigation.navigate('Survey', { quizScore: score + (isCorrect ? 1 : 0) });
    } else {
      // Passer à la question suivante
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const currentQ = questions[i18n.locale][currentQuestion];

  if (!currentQ) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{i18n.t('game.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{i18n.t('game.score', { score })}</Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          {i18n.t('game.question')} {currentQuestion + 1} {i18n.t('game.of')} {questions[i18n.locale].length}
        </Text>
        <Text style={styles.questionText}>{currentQ.question}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <AccessibleTouchable
          style={styles.button}
          onPress={() => handleAnswer('left')}
          soundDescription={i18n.t('game.left')}
          isAccessibilityModeOn={isAccessibilityMode}
        >
          <Text style={styles.buttonText}>{i18n.t('game.left')}</Text>
        </AccessibleTouchable>

        <AccessibleTouchable
          style={styles.button}
          onPress={() => handleAnswer('right')}
          soundDescription={i18n.t('game.right')}
          isAccessibilityModeOn={isAccessibilityMode}
        >
          <Text style={styles.buttonText}>{i18n.t('game.right')}</Text>
        </AccessibleTouchable>
      </View>

      <AccessibleTouchable
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
        soundDescription={i18n.t('game.settings')}
        isAccessibilityModeOn={isAccessibilityMode}
      >
        <Text style={styles.settingsText}>{i18n.t('game.settings')}</Text>
      </AccessibleTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  score: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
  },
  questionText: {
    fontSize: 22,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xlarge,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.xlarge,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    width: '45%',
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    marginTop: theme.spacing.medium,
  },
  settingsText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    textAlign: 'center',
  },
  loadingText: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
  },
});
