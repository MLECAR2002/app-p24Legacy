module.exports = {
  name: 'Football Quiz Paris 2024',
  slug: 'football-quiz-app',
  version: '1.0.0',
  platforms: ['web'],
  web: {
    bundler: 'webpack',
  },
  plugins: [
    ['expo-build-properties', {
      web: {
        excludeModules: ['expo-font'],
      },
    }],
  ],
};
