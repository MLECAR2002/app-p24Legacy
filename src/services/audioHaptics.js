import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

class AudioHapticsService {
  constructor() {
    this.sounds = {};
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Load sound effects
      const soundFiles = {
        focus: require('../assets/sounds/focus.mp3'),
        goal: require('../assets/sounds/goal.mp3'),
        save: require('../assets/sounds/save.mp3'),
        whistle: require('../assets/sounds/whistle.mp3'),
        surveyNext: require('../assets/sounds/survey-next.mp3'),
        surveySelect: require('../assets/sounds/survey-select.mp3'),
        surveySubmit: require('../assets/sounds/survey-submit.mp3')
      };

      // Load all sounds
      for (const [key, source] of Object.entries(soundFiles)) {
        const { sound } = await Audio.Sound.createAsync(source, {
          shouldPlay: false
        });
        this.sounds[key] = sound;
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  // Play focus sound and light haptic feedback
  async playFocus() {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (this.sounds.focus) {
        await this.sounds.focus.replayAsync();
      }
    } catch (error) {
      console.error('Error playing focus:', error);
    }
  }

  // Play goal sound and heavy haptic feedback
  async playGoal() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (this.sounds.goal) {
        await this.sounds.goal.replayAsync();
      }
    } catch (error) {
      console.error('Error playing goal:', error);
    }
  }

  // Play save sound and error haptic feedback
  async playSave() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (this.sounds.save) {
        await this.sounds.save.replayAsync();
      }
    } catch (error) {
      console.error('Error playing save:', error);
    }
  }

  // Play whistle sound at game start
  async playWhistle() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      if (this.sounds.whistle) {
        await this.sounds.whistle.replayAsync();
      }
    } catch (error) {
      console.error('Error playing whistle:', error);
    }
  }

  // Play survey navigation sound
  async playSurveyNext() {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (this.sounds.surveyNext) {
        await this.sounds.surveyNext.replayAsync();
      }
    } catch (error) {
      console.error('Error playing survey next:', error);
    }
  }

  // Play survey option selection sound
  async playSurveySelect() {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (this.sounds.surveySelect) {
        await this.sounds.surveySelect.replayAsync();
      }
    } catch (error) {
      console.error('Error playing survey select:', error);
    }
  }

  // Play survey submission sound
  async playSurveySubmit() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (this.sounds.surveySubmit) {
        await this.sounds.surveySubmit.replayAsync();
      }
    } catch (error) {
      console.error('Error playing survey submit:', error);
    }
  }

  // Text-to-speech function with question reading support
  async speak(text, language = 'en', options = {}) {
    try {
      // Stop any ongoing speech
      await Speech.stop();
      
      // Default options
      const defaultOptions = {
        pitch: 1.0,
        rate: 0.9
      };

      // Merge default options with provided options
      const speechOptions = {
        ...defaultOptions,
        ...options,
        language,
        onError: (error) => console.error('Speech error:', error)
      };
      
      // Start new speech
      await Speech.speak(text, speechOptions);
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  }

  // Read survey question and options
  async readSurveyQuestion(question, options, language = 'en') {
    const textToRead = options 
      ? `${question} ${options.map((opt, index) => `Option ${index + 1}: ${opt.text}`).join('. ')}`
      : question;
    
    await this.speak(textToRead, language, { rate: 0.85 });
  }

  // Clean up resources
  async cleanup() {
    try {
      // Unload all sounds
      for (const sound of Object.values(this.sounds)) {
        await sound.unloadAsync();
      }
      this.sounds = {};
      this.isInitialized = false;
    } catch (error) {
      console.error('Error cleaning up audio:', error);
    }
  }
}

export default new AudioHapticsService();
