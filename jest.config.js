module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest/setup.js',
    ],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|expo-modules-core|expo-constants|expo-linking|react-native-reanimated|react-native-new-snap-carousel|expo-modules-core|expo-font|@expo/vector-icons|expo-splash-screen|@react-navigation|react-clone-referenced-element|react-native-safe-area-context|react-navigation|expo-status-bar|@env)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^.+\\.(css|scss)$': '<rootDir>/__mocks__/CSSStub.config.js',
      'react-dotenv': '<rootDir>/__mocks__/react-dotenv.tsx',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/jest/__mocks__/Mock.js',
    },
  };
  