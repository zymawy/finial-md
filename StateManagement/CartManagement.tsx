import AsyncStorage from "@react-native-async-storage/async-storage";


import React, {
	useReducer,
	useMemo,
	useContext, useEffect
} from "react";
import reducer from "./Reducer";
import Actions from "./Actions";


export const CartContext = React.createContext(null);

export async function getCartItems() {
	try {
		let cartItems = await AsyncStorage.getItem('@carts');
		return cartItems ? JSON.parse(cartItems) : [];
	} catch (e) {
		console.warn(e)
		return []
	}
}

export async function storeData(perfume: any, dispatch) {
	 await getCartItems()
	  .then(async (perfumes) => {
		let toBeSaved;
		let item = await getPerfume(perfume.id);
		if (!item) {
		  toBeSaved = [...perfumes, {
			id: perfume.id,
			qty: 1,
			name: perfume.name,
			totalPrice: perfume.price,
			image: perfume.image
		  }];
		} else {
		  toBeSaved = perfumes.map((item: {
			id:number,
			name: string
			qty: number,
			totalPrice: number,
		  }) => {
			// @ts-ignore
			if (item.id == perfume.id) {
			  item.qty++;
			  item.totalPrice += Number(perfume.price);
			}
			return {
			  id: item.id,
			  qty: item.qty,
			  name: item.name,
			  totalPrice: Number(item.totalPrice),
			  image: perfume.image
			};
		  });
		  toBeSaved = toBeSaved.filter((value: any, index: any, self: any) =>
			index === self.findIndex((t: any) => (
			  t.id === value.id
			))
		  );
		}

		try {
		  await AsyncStorage.setItem('@carts', JSON.stringify(toBeSaved));
		  dispatch({ type: 'ADD_CART_ITEM', items:  await getCartItems() });

		  return toBeSaved;
		} catch (e) {
		  console.warn(e);
		}
	  });
  }


export async function getPerfume (id: number|string) {
	let perfumes = await getCartItems();
	let item = perfumes.find((item: object) => item?.id == id);
	return item ? item : null;
}


function generateOrderId() {
	return Math.floor(Math.random() * 1000000000);
  }

export async function getOrders() {
	try {
		let orders = await AsyncStorage.getItem('@orders');
		return orders ? JSON.parse(orders) : [];
	} catch (e) {
		console.warn(e)
		return []
	}
}
export async function createOrder() {
	let perfumes = await getCartItems();
	let orders = [];

	try {
	  const existingOrders = await AsyncStorage.getItem('@orders');
	  orders = existingOrders ? JSON.parse(existingOrders) : [];

	  const newOrder = {
		id: generateOrderId(),
		date: new Date().toISOString(),
		items: perfumes,
		total: perfumes.reduce((total, item) => total + item.totalPrice * item.qty, 0),
	  };

	  orders.push(newOrder);

	  await AsyncStorage.setItem('@orders', JSON.stringify(orders));


	  await AsyncStorage.removeItem('@carts');

	  return newOrder.id;
	} catch (e) {
	  console.warn('Error placing order:', e);
	}
  }

export const initialState: any = {
	cartItems: [],
	totalCartItems: 0,
	totalPrice: 0
};

export function CartManagement(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState);

		useEffect(() => {
			const loadCartItems = async () => {
				try {
					let perfumes = await getCartItems();
					let orders = await getOrders();

					dispatch(Actions.setCartItems(perfumes));
					dispatch(Actions.setTotalCartItems(perfumes.length));
					dispatch(Actions.setTotalPrice(perfumes.reduce((sum, item) => sum + item.totalPrice, 0)));

					dispatch(Actions.setOrders(orders));
				} catch (e) {
					console.warn(e);
				}
			};
			loadCartItems();
		}, []);

	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);

	return (
		<CartContext.Provider value={contextValue as any}>
			{props.children}
		</CartContext.Provider>
	);
}

export default function useCartManagement() {
	const context: any = useContext(CartContext);
	return { state: context.state, dispatch: context.dispatch };
}



// async function loadLocalCertItems() {
// 	try {
// 		let perfumes = await getCartItems();

// 		cartDispatch(
// 			Actions.setCartItems(perfumes)
// 		);
// 		cartDispatch(
// 			Actions.setTotalCartItems(perfumes?.length || 0)
// 		)

// 		if (perfumes?.length) {
// 			cartDispatch(
// 				Actions.setTotalPrice(perfumes.reduce((sum: number, item: object) => (sum + Number(item.totalPrice)), 0))
// 			)
// 		}

// 	} catch (e) {
// 		console.warn(e)
// 	}
// }
