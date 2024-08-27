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
      case 'SET_CART_ITEMS':
        return {
          ...state,
			cartItems: action.items,
			totalCartItems: action?.items?.length,
			totalPrice: action?.items?.reduce((sum, item) => sum + item.totalPrice, 0),
        };
      case 'ADD_CART_ITEM':
        return {
          ...state,
          cartItems: action.items,
          totalCartItems: action?.items?.length,
          totalPrice: action?.items?.reduce((sum, item) => sum + item.totalPrice, 0),
        };
      case 'REMOVE_CART_ITEM':
        return {
          ...state,
			cartItems: action.items,
			totalCartItems: action?.items?.length,
			totalPrice: action?.items?.reduce((sum, item) => sum + item.totalPrice, 0),
        };
	  case 'ORDER_PLACED':
		  return {
			  ...state,
			  orders: action.orders,
		  };
    default:
      return state;
  }
}
