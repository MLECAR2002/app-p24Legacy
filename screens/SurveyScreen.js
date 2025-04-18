import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function SurveyScreen({ route, navigation }) {
  const { finalScore } = route.params;
  const [answers, setAnswers] = useState({
    enjoyment: 0,
    difficulty: 0,
    feedback: '',
  });

  const ratingButtons = [1, 2, 3, 4, 5];

  const submitSurvey = () => {
    // Ici, vous pourriez envoyer les réponses à un serveur
    alert('Merci pour vos réponses !');
    navigation.navigate('Game');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Questionnaire de satisfaction</Text>
      <Text style={styles.score}>Score final : {finalScore}</Text>

      <View style={styles.questionBlock}>
        <Text style={styles.question}>Avez-vous apprécié le jeu ?</Text>
        <View style={styles.ratingContainer}>
          {ratingButtons.map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                answers.enjoyment === rating && styles.selectedRating,
              ]}
              onPress={() => setAnswers({ ...answers, enjoyment: rating })}
            >
              <Text style={styles.ratingText}>{rating}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.questionBlock}>
        <Text style={styles.question}>Niveau de difficulté ?</Text>
        <View style={styles.ratingContainer}>
          {ratingButtons.map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                answers.difficulty === rating && styles.selectedRating,
              ]}
              onPress={() => setAnswers({ ...answers, difficulty: rating })}
            >
              <Text style={styles.ratingText}>{rating}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.questionBlock}>
        <Text style={styles.question}>Vos commentaires :</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={answers.feedback}
          onChangeText={(text) => setAnswers({ ...answers, feedback: text })}
          placeholder="Donnez-nous votre avis..."
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitSurvey}>
        <Text style={styles.submitButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#2196F3',
  },
  questionBlock: {
    marginBottom: 30,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRating: {
    backgroundColor: '#2196F3',
  },
  ratingText: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
