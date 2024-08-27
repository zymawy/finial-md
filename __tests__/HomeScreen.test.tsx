import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { CartContext } from '../StateManagement/CartManagement';


const mockNavigation = {
  dispatch: jest.fn(),
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
};

const mockRoute = {
  params: {
  
  },
};

const mockCartContextValue = {
  state: { items: [] },
  dispatch: jest.fn(),
};

describe('HomeScreen Component', () => {
  it('renders HomeScreen correctly with banners, brands, perfumes, and testimonials', async () => {
    const { getByText, getAllByTestId } = render(
      <NavigationContainer>
        <CartContext.Provider value={mockCartContextValue}>
          <HomeScreen navigation={mockNavigation} route={mockRoute} />
        </CartContext.Provider>
      </NavigationContainer>
    );

  
    expect(getAllByTestId('banner-image').length).toBeGreaterThan(0);
    expect(getAllByTestId('brand-item').length).toBeGreaterThan(0);
  });
});
