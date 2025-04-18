import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import GameScreen from './screens/GameScreen';
import SurveyScreen from './screens/SurveyScreen';
import SettingsScreen from './screens/SettingsScreen';
import { theme } from './src/theme';
import storage from './src/services/storage';
import { initializeLanguage } from './src/i18n';

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize storage and load settings
        await storage.initializeApp();
        
        // Initialize language settings
        await initializeLanguage();

        // Wait for fonts to load
        await Font.loadAsync({
          'Poppins-Regular': Poppins_400Regular,
          'Poppins-Medium': Poppins_500Medium,
          'Poppins-Bold': Poppins_700Bold
        });
      } catch (e) {
        console.error('Error preparing app:', e);
        setError(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Une erreur est survenue. Veuillez redémarrer l'application.</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Game"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontFamily: theme.fonts.medium,
          },
        }}
      >
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{ title: 'Football Quiz' }}
        />
        <Stack.Screen 
          name="Survey" 
          component={SurveyScreen} 
          options={{ title: 'Questionnaire' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Paramètres' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
  },
});
