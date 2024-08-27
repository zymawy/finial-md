import { cleanup } from '@testing-library/react-native';


jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

// jest/setup.js
jest.mock('react-native-gesture-handler', () => {
    return {
      GestureHandlerRootView: jest.fn(),
      Directions: {},
      State: {},
      PanGestureHandler: jest.fn(),
      TapGestureHandler: jest.fn(),
      FlingGestureHandler: jest.fn(),
      ForceTouchGestureHandler: jest.fn(),
      LongPressGestureHandler: jest.fn(),
      PinchGestureHandler: jest.fn(),
      RotationGestureHandler: jest.fn(),
      TouchableOpacity: jest.requireActual('react-native').TouchableOpacity,
    };
  });
  

jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  SyntheticPlatformEmitter: {
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  },
  requireNativeModule: jest.fn(),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('@expo/vector-icons', () => ({
  FontAwesome: jest.fn(),
}));


jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));



jest.mock('expo-constants', () => ({
  manifest: {
    extra: {},
  },
  appOwnership: 'expo',
  platform: {
    ios: {},
    android: {},
    web: {},
  },
}));

jest.mock('expo-modules-core', () => ({
  CodedError: class CodedError extends Error {},
  requireOptionalNativeModule: jest.fn(),
}));


jest.mock('expo-linking', () => ({
  createURL: jest.fn(() => 'mock://url'),
  parse: jest.fn(),
  resolveScheme: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

afterEach(() => {
  cleanup();
});


jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Linking: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      removeSubscription: jest.fn(),
    },
  };
});


jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Settings: {
      get: jest.fn(),
      set: jest.fn(),
      watchKeys: jest.fn(),
      clearWatch: jest.fn(),
    },
    Linking: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      removeSubscription: jest.fn(),
    },
  };
});


jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}));

