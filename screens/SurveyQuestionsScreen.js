import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { surveyQuestions } from '../src/data/surveyQuestions';
import audioHaptics from '../src/services/audioHaptics';
import AccessibleTouchable from '../src/components/AccessibleTouchable';
import { useNavigation } from '@react-navigation/native';
import i18n from '../src/i18n';
import { theme } from '../src/theme';

const SurveyQuestionsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { navigate } = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState('');
  const questions = surveyQuestions[i18n.language] || surveyQuestions.en;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Read the current question when it changes
    const readCurrentQuestion = async () => {
      if (currentQuestion) {
        await audioHaptics.readSurveyQuestion(
          currentQuestion.question,
          currentQuestion.type === 'single' ? currentQuestion.options : null,
          i18n.language
        );
      }
    };
    readCurrentQuestion();
  }, [currentQuestion, i18n.language]);

  const handleOptionSelect = async (value) => {
    await audioHaptics.playSurveySelect();
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  const handleTextChange = (text) => {
    setTextInput(text);
    setAnswers({
      ...answers,
      [currentQuestion.id]: text
    });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      await audioHaptics.playSurveyNext();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await audioHaptics.playSurveySubmit();
      // Save answers and navigate to thank you screen
      navigate('ThankYou');
    }
  };

  const isNextEnabled = () => {
    if (currentQuestion.type === 'text') {
      return textInput.trim().length > 0;
    }
    return answers[currentQuestion.id] !== undefined;
  };

  const renderQuestion = () => {
    if (currentQuestion.type === 'single') {
      return (
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <AccessibleTouchable
              key={option.value}
              onPress={() => handleOptionSelect(option.value)}
              style={[
                styles.option,
                answers[currentQuestion.id] === option.value && styles.selectedOption
              ]}
              soundDescription={option.text}
            >
              <Text style={[
                styles.optionText,
                answers[currentQuestion.id] === option.value && styles.selectedOptionText
              ]}>
                {option.text}
              </Text>
            </AccessibleTouchable>
          ))}
        </View>
      );
    } else if (currentQuestion.type === 'text') {
      return (
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          value={textInput}
          onChangeText={handleTextChange}
          placeholder={currentQuestion.placeholder}
          placeholderTextColor="#666"
          accessibilityLabel={currentQuestion.placeholder}
          accessibilityHint={t('survey.textInputHint')}
        />
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {renderQuestion()}
        <AccessibleTouchable
          onPress={handleNext}
          style={[styles.nextButton, !isNextEnabled() && styles.disabledButton]}
          disabled={!isNextEnabled()}
          soundDescription={
            currentQuestionIndex < questions.length - 1
              ? t('survey.nextQuestion')
              : t('survey.submit')
          }
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < questions.length - 1
              ? t('survey.next')
              : t('survey.submit')}
          </Text>
        </AccessibleTouchable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    fontFamily: 'Poppins'
  },
  question: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 20,
    fontFamily: 'Poppins'
  },
  optionsContainer: {
    marginBottom: 20
  },
  option: {
    backgroundColor: theme.colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  selectedOption: {
    backgroundColor: theme.colors.primary
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: 'Poppins'
  },
  selectedOptionText: {
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.text,
    padding: 15,
    borderRadius: 10,
    minHeight: 120,
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontSize: 16
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: theme.colors.secondary,
    opacity: 0.5
  },
  nextButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  }
});

export default SurveyQuestionsScreen;
