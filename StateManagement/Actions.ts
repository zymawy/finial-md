export const ACTION_TYPES = {
  setUser: 1,
  setCartItems: 2,
  setTotalCartItems: 3,
  setTotalPrice: 4,
};

export default class Actions {
  static setUser(user: any) {
    return { type: ACTION_TYPES.setUser, payload: user };
  }

	static setCartItems(perfumes: any) {
		return { type: ACTION_TYPES.setCartItems, cartItems: perfumes};
	}
	static setTotalCartItems(total: number) {

	  return {type: ACTION_TYPES.setTotalCartItems, totalCartItems: total}
	}

	static setTotalPrice(total: number) {

		return {type: ACTION_TYPES.setTotalPrice, totalPrice: total}
	}
}
