import { ACTION_TYPES as AT } from './Actions';

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case AT.setUser:
      const user = action.payload;
      return { ...state, user };
    case AT.setCartItems:
      const cartItems = action.cartItems;
      return { ...state, cartItems };
    case AT.setTotalCartItems:
      const totalCartItems = action.totalCartItems;
      return { ...state, totalCartItems };
    case AT.setTotalPrice:
      const totalPrice = action.totalPrice;
      return { ...state, totalPrice };
    default:
      return state;
  }
}
