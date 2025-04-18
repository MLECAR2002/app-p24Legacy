import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

class SurveyService {
  constructor() {
    this.STORAGE_KEY = 'survey_responses';
    this.RESPONSES_FILE = FileSystem.documentDirectory + 'survey_responses.json';
    this.GOOGLE_FORM_URL = 'VOTRE_URL_FORMULAIRE';  // À remplacer par l'URL de votre formulaire Google
  }

  async saveSurveyResponse(response) {
    try {
      // Ajouter un timestamp et un ID unique
      const surveyResponse = {
        ...response,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };

      // Sauvegarder dans le fichier
      await this.saveToFile(surveyResponse);

      // Envoyer à Google Forms
      await this.sendToGoogleForms(surveyResponse);

      return true;
    } catch (error) {
      console.error('Error saving survey response:', error);
      return false;
    }
  }

  async saveToFile(response) {
    try {
      // Lire les réponses existantes
      let responses = await this.getAllResponses();
      
      // Ajouter la nouvelle réponse
      responses.push(response);
      
      // Écrire dans le fichier
      await FileSystem.writeAsStringAsync(
        this.RESPONSES_FILE,
        JSON.stringify(responses, null, 2)
      );

      console.log('Response saved to file:', this.RESPONSES_FILE);
    } catch (error) {
      console.error('Error saving to file:', error);
      throw error;
    }
  }

  async getAllResponses() {
    try {
      // Vérifier si le fichier existe
      const fileInfo = await FileSystem.getInfoAsync(this.RESPONSES_FILE);
      
      if (!fileInfo.exists) {
        // Si le fichier n'existe pas, créer un tableau vide
        await FileSystem.writeAsStringAsync(
          this.RESPONSES_FILE,
          JSON.stringify([], null, 2)
        );
        return [];
      }

      // Lire le contenu du fichier
      const content = await FileSystem.readAsStringAsync(this.RESPONSES_FILE);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error getting responses:', error);
      return [];
    }
  }

  async sendToGoogleForms(response) {
    try {
      const formData = new FormData();
      
      // Mapper les réponses aux champs du formulaire Google
      Object.entries(response.answers).forEach(([key, value]) => {
        formData.append(`entry.${key}`, value);
      });
      
      // Ajouter les métadonnées
      formData.append('entry.timestamp', response.timestamp);
      formData.append('entry.id', response.id);
      formData.append('entry.language', response.language);
      formData.append('entry.quizScore', response.quizScore);

      // Envoyer au formulaire Google
      const result = await fetch(this.GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      return true;
    } catch (error) {
      console.error('Error sending to Google Forms:', error);
      return false;
    }
  }

  async exportToCSV() {
    try {
      const responses = await this.getAllResponses();
      
      if (responses.length === 0) {
        return null;
      }

      // Créer l'en-tête CSV
      const headers = [
        'ID',
        'Date',
        'Langue',
        'Score Quiz',
        'Q1 - Racisme et inclusion',
        'Q2 - Protection enfance',
        'Q3 - Sport féminin',
        'Q4 - Sport pour tous',
        'Q5 - Personnes âgées',
        'Q6 - LGBTQIA+',
        'Q7 - Solidarité',
        'Q8 - Commentaires'
      ].join(',');

      // Convertir les réponses en lignes CSV
      const rows = responses.map(response => {
        const answers = response.answers || {};
        return [
          response.id,
          response.timestamp,
          response.language,
          response.quizScore,
          answers['1'] || '',
          answers['2'] || '',
          answers['3'] || '',
          answers['4'] || '',
          answers['5'] || '',
          answers['6'] || '',
          answers['7'] || '',
          (answers['8'] || '').replace(/,/g, ';').replace(/\n/g, ' ')
        ].join(',');
      });

      // Combiner l'en-tête et les lignes
      const csvContent = [headers, ...rows].join('\n');

      // Créer le fichier CSV
      const csvFileName = FileSystem.documentDirectory + 'survey_responses.csv';
      await FileSystem.writeAsStringAsync(csvFileName, csvContent);

      console.log('CSV file created at:', csvFileName);
      return csvFileName;
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      return null;
    }
  }

  getResponsesFilePath() {
    return this.RESPONSES_FILE;
  }

  getCsvFilePath() {
    return FileSystem.documentDirectory + 'survey_responses.csv';
  }
}

export default new SurveyService();
