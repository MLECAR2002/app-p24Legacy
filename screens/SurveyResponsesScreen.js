import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useTranslation } from 'react-i18next';
import surveyService from '../src/services/surveyService';
import * as FileSystem from 'expo-file-system';

const SurveyResponsesScreen = () => {
  const { t } = useTranslation();
  const [responses, setResponses] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    const allResponses = await surveyService.getAllResponses();
    setResponses(allResponses);
    setTotalResponses(allResponses.length);
  };

  const handleExportCSV = async () => {
    try {
      const csvFilePath = await surveyService.exportToCSV();
      
      if (csvFilePath) {
        await Share.share({
          title: 'Réponses au questionnaire',
          url: csvFilePath
        });
      }
    } catch (error) {
      console.error('Error sharing CSV:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('responses.title')}</Text>
        <Text style={styles.subtitle}>
          {t('responses.total', { count: totalResponses })}
        </Text>
        <TouchableOpacity 
          style={styles.exportButton}
          onPress={handleExportCSV}
        >
          <Text style={styles.exportButtonText}>
            {t('responses.export')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.responsesList}>
        {responses.map((response, index) => (
          <View key={response.id} style={styles.responseItem}>
            <Text style={styles.responseDate}>
              {formatDate(response.timestamp)}
            </Text>
            <Text style={styles.responseLanguage}>
              {t('responses.language')}: {response.language}
            </Text>
            <Text style={styles.responseScore}>
              {t('responses.score')}: {response.quizScore}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Poppins'
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    fontFamily: 'Poppins'
  },
  exportButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  responsesList: {
    padding: 20
  },
  responseItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  responseDate: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins'
  },
  responseLanguage: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Poppins'
  },
  responseScore: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Poppins'
  }
});

export default SurveyResponsesScreen;
