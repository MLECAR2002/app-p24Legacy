export default {
  expo: {
    name: "Football Quiz",
    slug: "football-quiz-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.p24legacy.footballquiz",
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.p24legacy.footballquiz",
      versionCode: 1
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: 'metro'
    },
    plugins: [
      "expo-localization",
      "expo-font",
      "expo-av",
      "expo-haptics"
    ],
    extra: {
      eas: {
        projectId: "your-project-id"
      }
    },
    updates: {
      enabled: true,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 30000
    }
  }
};
