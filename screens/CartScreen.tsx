import React from 'react';
import {
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import Button from "../components/Button";
import Actions from "../StateManagement/Actions";
import useCartManagement, {
	createOrder,
	getCartItems, getOrders
} from "../StateManagement/CartManagement";
import { FontAwesome } from "@expo/vector-icons";
import { primary } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
    const { state, dispatch } = useCartManagement();

    const calculateTotal = () => {
        return state.cartItems.reduce((total, item) => total += Number(item.totalPrice), 0);
    };

    const completeOrder = async () => {
		const id = await createOrder();
		dispatch(Actions.setTotalCartItems(0));
		dispatch(Actions.setCartItems([]));
		dispatch(Actions.setTotalPrice(0));

		dispatch({ type: 'ORDER_PLACED', orders: await getOrders() });

		Alert.alert('Success', `Your order #${id} has been placed 🎉!`);

    };

    const removeItem = async (itemId) => {
        let updatedCartItems = state.cartItems.filter(item => item.id !== itemId);
        await AsyncStorage.setItem('@carts', JSON.stringify(updatedCartItems));
		dispatch({ type: 'REMOVE_CART_ITEM', items:  updatedCartItems });
      };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image style={styles.thumbnail} source={{ uri: item.image }} />
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>Quantity: {item.qty}</Text>
                <Text style={styles.itemDetails}>Price: ${Number(item.totalPrice).toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.removeItemButton} onPress={() => removeItem(item.id)}>
                <Text style={styles.buttonText}>
				<FontAwesome name={'trash-o'} size={20} color="#fff" style={styles.icon} />
				</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTotals = () => (
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>
    );

    return (
		<View style={styles.container}>
        <FlatList
            data={state.cartItems}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
        />
        <View style={styles.footer}>
            {renderTotals()}
            <Button
                style={styles.checkoutButton}
                text="Proceed to Checkout"
                onPress={completeOrder}
                disabled={state.cartItems.length <= 0}
				icon="money"
				disabledText="Proceed to Checkout"
				disabledColor={primary}
				disabledIcon="money"
            />
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    flatListContent: {
        paddingBottom: 120,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 3,
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
    itemDetailsContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    totalContainer: {
        marginVertical: 10,
        alignItems: 'flex-end',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: primary,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
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
	icon: {
        marginRight: 5,
        color: '#fff',
    },
});


export default CartScreen;
