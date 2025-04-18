const nodemailer = require('nodemailer');
const { Parser } = require('json2csv');
const mongoose = require('mongoose');
require('dotenv').config();

// Configuration email
const emailConfig = {
  recipient: 'm.lecardronnel@puc.paris',
  subject: 'Rapport quotidien des réponses au questionnaire',
  body: 'Veuillez trouver ci-joint le fichier CSV contenant toutes les réponses au questionnaire.'
};

// Connexion à MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Schéma pour les réponses au questionnaire
const surveyResponseSchema = new mongoose.Schema({
  id: String,
  timestamp: Date,
  answers: Object,
  language: String,
  quizScore: Number
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Fonction pour récupérer toutes les réponses
async function getAllResponses() {
  try {
    return await SurveyResponse.find({});
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}

// Fonction pour convertir les réponses en CSV
function convertToCSV(responses) {
  const fields = [
    'id',
    'timestamp',
    'language',
    'quizScore',
    'q1_racisme_inclusion',
    'q2_protection_enfance',
    'q3_sport_feminin',
    'q4_sport_pour_tous',
    'q5_personnes_agees',
    'q6_lgbtqia',
    'q7_solidarite',
    'q8_commentaires'
  ];

  const json2csvParser = new Parser({ fields });
  
  const data = responses.map(response => ({
    id: response.id,
    timestamp: response.timestamp,
    language: response.language,
    quizScore: response.quizScore,
    q1_racisme_inclusion: response.answers['1'],
    q2_protection_enfance: response.answers['2'],
    q3_sport_feminin: response.answers['3'],
    q4_sport_pour_tous: response.answers['4'],
    q5_personnes_agees: response.answers['5'],
    q6_lgbtqia: response.answers['6'],
    q7_solidarite: response.answers['7'],
    q8_commentaires: response.answers['8']
  }));

  return json2csvParser.parse(data);
}

// Fonction pour envoyer l'email
async function sendEmail(csvContent) {
  const date = new Date().toISOString().split('T')[0];
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: emailConfig.recipient,
    subject: emailConfig.subject,
    text: emailConfig.body,
    attachments: [{
      filename: `survey_responses_${date}.csv`,
      content: csvContent
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Fonction principale
async function sendDailySurveyReport() {
  try {
    await connectDB();
    const responses = await getAllResponses();
    const csvContent = convertToCSV(responses);
    await sendEmail(csvContent);
  } catch (error) {
    console.error('Error in daily report process:', error);
  } finally {
    await mongoose.connection.close();
  }
}

// Exécuter le script
sendDailySurveyReport();
