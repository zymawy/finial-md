import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../screens/SplashScreen';
import { Animated } from 'react-native';

describe('SplashScreen Component', () => {
  beforeEach(() => {
    jest.spyOn(Animated, 'timing').mockImplementation(() => ({
      start: jest.fn(),
    }));
    jest.spyOn(Animated, 'sequence').mockImplementation(() => ({
      start: jest.fn(),
    }));
    jest.spyOn(Animated, 'loop').mockImplementation(() => ({
      start: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<SplashScreen />);
    const imageElement = getByTestId('splash-image');
    expect(imageElement).toBeTruthy();
  });

  it('should animate the image', () => {
    render(<SplashScreen />);
    expect(Animated.loop).toHaveBeenCalledTimes(1);
    expect(Animated.sequence).toHaveBeenCalledTimes(1);
    expect(Animated.timing).toHaveBeenCalledTimes(2);
  });
});
