import AsyncStorage from "@react-native-async-storage/async-storage";


import React, {
	useReducer,
	useMemo,
	useContext, useEffect, useState
} from "react";
import reducer from "./Reducer";


export const CartContext = React.createContext(null);

export async function getCartItems() {
	try {
		let cartItems = await AsyncStorage.getItem('@cart');
		cartItems = cartItems ? JSON.parse(cartItems) : [];
		// console.warn('Cart Loaded!', cartItems?.length)
		return cartItems;
	} catch (e) {
		console.warn(e)
		return []
	}
}

export async function storeData(perfume: any) {

	await getCartItems()
		.then( async (perfumes) => {

			let toBeSaved;
			let item = await getPerfume(perfume.id);
			// let item = perfumes.find((item: object) => item?.id == perfume?.id);
			// console.warn('did we find item?', item)
			if (! item) {
				toBeSaved =  [...perfumes, {
					id: perfume.id,
					qty: 1,
					name: perfume.name,
					totalPrice: perfume.price,
					image: perfume.image
				}];
			} else {
				toBeSaved = perfumes.map((item: object) => {
					// @ts-ignore
					if(item.id == perfume.id) {
						item.qty++;
						item.totalPrice += perfume.price;
					}
					return {
						id: item.id,
						qty: item.qty,
						name: item.name,
						totalPrice: item.totalPrice,
						image: perfume.image
					};
				})
				toBeSaved =	toBeSaved.filter((value: any, index: any, self: any) =>
					index === self.findIndex((t: any) => (
						t.id === value.id
					)))
			}
			
			try {
				await AsyncStorage.setItem('@cart', JSON.stringify(toBeSaved));

			} catch (e) {
				console.warn(e);
			}
		})
}

export async function getPerfume (id: number|string) {
	let perfumes = await getCartItems();
	let item = perfumes.find((item: object) => item?.id == id);
	return item ? item : null;
}

export const initialState: any = {
	cartItems: [],
	totalCartItems: 0,
	totalPrice: 0
};

export function CartManagement(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState);
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
