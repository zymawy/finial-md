import React from 'react';
import {
	Text,
	FlatList,
	StyleSheet,
	Image,
	TouchableOpacity, Alert
} from 'react-native';
import Button from "../components/Button";
// Importing a custom button component

import {View, ScrollView} from "../components/Themed";
import customAxios from "../axios/axios";
import Actions from "../StateManagement/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCartManagement from "../StateManagement/CartManagement";


const ShoppingCartScreen = () => {
	const { state, dispatch } = useCartManagement();
	const calculateTotal = () => {
		let total = 0;
		console.log(state.cartItems)
		state.cartItems.forEach(item => total += item.totalPrice);
		return total;
	}

	const handleCheckout = () => {
		// Implement checkout functionality here
		console.log('Proceeding to Checkout');
	}

	async function completeOrder  () {


		console.log({
			cart_items_ids: state.cartItems
		})
		const res =  await customAxios.post('/carts', {
			cart_items_ids: state.cartItems.map((item: object) => {
				return {'id': item.id, 'qty': item.qty}
			})
		})

		if (res.data) {
			dispatch(
				Actions.setTotalCartItems(0)
			)
			dispatch(
				Actions.setCartItems([])
			)
			dispatch(
				Actions.setTotalPrice(0)
			)

			await AsyncStorage.clear();
			await  AsyncStorage.removeItem('@cart')
		}

		Alert.alert(
			"Success",
			`Wow, order placed with #${res.data.id} 🎉`,
			[
				{ text: "OK" }
			]
		);
	}
	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Text style={styles.itemName}>{item.name}</Text>
			<Text style={styles.itemDetails}>Quantity: {item.qty}</Text>
			<Text style={styles.itemDetails}>Price: ${item.totalPrice}</Text>
			<Text style={styles.itemDetails}>Subtotal: ${item.totalPrice}</Text>
		</View>
	);

	function renderTotals() {
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.totalText}></Text>
				<Text style={styles.totalText}></Text>
				<Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
			</View>
		);
	}


	return (
		<View style={styles.container}>
			<FlatList
				data={state.cartItems}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<Image style={styles.thumbnail} source={{ uri: item.image }} />
						<Text style={styles.itemText}>{item.name} x {item.qty}</Text>
						<Text style={styles.itemText}>${item.totalPrice}</Text>
						<TouchableOpacity style={styles.removeItemButton} onPress={() => removeItem(item.id)}>
							<Text style={styles.buttonText}>Remove</Text>
						</TouchableOpacity>
					</View>
				)}
				ListFooterComponent={renderTotals}
			/>
			<View style={styles.totalContainer}>
				<Button style={styles.checkoutButton} text="Proceed to Checkout" onPress={completeOrder}  disabled={false}/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	itemContainer: {
		padding: 10,
		backgroundColor: '#f8f8f8',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 1,
		elevation: 3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'lightgray',
		marginBottom: 10,
		borderRadius: 5,
	},
	thumbnail: {
		width: 50,
		height: 50,
		marginRight: 10,
	},
	//
	itemName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	itemDetails: {
		fontSize: 16,
	},
	total: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'right',
		marginBottom: 20,
		backgroundColor: '#f8f8f8',
	},
	checkoutButton: {
		backgroundColor: '#ff6347',
		color: '#fff',
	},
	itemText: {
		fontSize: 16,
		backgroundColor: '#f8f8f8',
	},
	totalContainer: {
		marginTop: 20,
	},
	totalText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	removeItemButton: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default ShoppingCartScreen;
