import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PerfumesScreen from '../screens/PerfumesScreen';
import { getPerfumesByReference } from '../data/perfumes';
import { CartContext } from '../StateManagement/CartManagement';

jest.mock('../data/perfumes', () => ({
  getPerfumesByReference: jest.fn(),
}));


const mockCartContext = {
  state: {
    cartItems: [],
  },
  dispatch: jest.fn(),
};

describe('PerfumesScreen Component', () => {
  const mockRoute = {
    params: {
      reference_type: 'all',
      reference_id: '123',
    },
  };

  const mockNavigation = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
  };

  it('displays loading indicator while fetching perfumes', async () => {
    (getPerfumesByReference as jest.Mock).mockReturnValueOnce({
      data: [],
      error: '',
      loading: true,
      isBanner: false,
    });

    const { getByTestId } = render(
      <CartContext.Provider value={mockCartContext}>
        <PerfumesScreen navigation={mockNavigation} route={mockRoute} />
      </CartContext.Provider>
    );
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('displays perfumes correctly after fetching', async () => {
    const perfumesMock = {
      data: [{ id: '1', name: 'Perfume 1' }, { id: '2', name: 'Perfume 2' }],
      error: '',
      loading: false,
      isBanner: false,
    };

    (getPerfumesByReference as jest.Mock).mockReturnValueOnce(perfumesMock);

    const { getByText } = render(
      <CartContext.Provider value={mockCartContext}>
        <PerfumesScreen navigation={mockNavigation} route={mockRoute} />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Perfume 1')).toBeTruthy();
      expect(getByText('Perfume 2')).toBeTruthy();
    });
  });

  it('displays error message when fetching perfumes fails', async () => {
    (getPerfumesByReference as jest.Mock).mockReturnValueOnce({
      data: [],
      error: 'Failed to fetch perfumes',
      loading: false,
      isBanner: false,
    });

    const { getByText } = render(
      <CartContext.Provider value={mockCartContext}>
        <PerfumesScreen navigation={mockNavigation} route={mockRoute} />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Failed to fetch perfumes')).toBeTruthy();
    });
  });
});
