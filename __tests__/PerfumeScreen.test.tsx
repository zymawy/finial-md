import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PerfumeScreen from '../screens/PerfumeScreen';
import { CartContext } from '../StateManagement/CartManagement';

const mockPerfume = {
  name: 'Perfume Name',
  price: '49.99',
  description: 'This is a sample perfume description.',
  gallery: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
};

const mockRoute = {
  params: {
    perfume: mockPerfume,
  },
};

const mockNavigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
};

const mockCartContext = {
  state: { cartItems: [] },
  dispatch: jest.fn(),
};

describe('PerfumeScreen Component', () => {
  it('renders perfume details correctly', () => {
    const { getByText, getByTestId } = render(
      <CartContext.Provider value={mockCartContext}>
        <PerfumeScreen navigation={mockNavigation} route={mockRoute} />
      </CartContext.Provider>
    );

    expect(getByText('Perfume Name')).toBeTruthy();
    expect(getByText('$49.99')).toBeTruthy();
    expect(getByText('This is a sample perfume description.')).toBeTruthy();
  });

  it('adds the perfume to the cart', async () => {
    const { getByText } = render(
      <CartContext.Provider value={mockCartContext}>
        <PerfumeScreen navigation={mockNavigation} route={mockRoute} />
      </CartContext.Provider>
    );

    const addToCartButton = getByText('Add to Cart');
    fireEvent.press(addToCartButton);

    await waitFor(() => {
      expect(mockCartContext.dispatch).toHaveBeenCalledWith({
        type: 'ADD_TO_CART',
        payload: mockPerfume,
      });
    });
  });

  it('renders the carousel and allows navigation', async () => {
    const { getByTestId } = render(
      <CartContext.Provider value={mockCartContext}>
        <PerfumeScreen navigation={mockNavigation} route={mockRoute} />
      </CartContext.Provider>
    );

    const firstImage = getByTestId('carousel-image-0');
    expect(firstImage).toBeTruthy();
    
    const secondImage = getByTestId('carousel-image-1');
    fireEvent.scroll(secondImage, { nativeEvent: { contentOffset: { x: 200, y: 0 } } });

    await waitFor(() => {
      expect(secondImage).toBeTruthy();
    });
  });
});
