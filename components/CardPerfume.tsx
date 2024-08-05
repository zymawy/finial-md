import React, { useRef } from 'react';

import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import { primary, secondary } from "../constants/Colors";

const { width } = Dimensions.get('window');


const CardPerfume =  ({ perfume, onProductPress, onAddToCart }) => {

	const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

	// Animate the visibility of the Card when it is rendered
	React.useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,  // Add This line
			}
		).start();
	}, [fadeAnim]);

	return (
		<Animated.View style={{...styles.card, opacity: fadeAnim}}>
			<TouchableOpacity onPress={onProductPress}>
				<Image source={{ uri: perfume.image }} style={styles.image} />
				<View style={styles.overlay}>
					<Text style={styles.productName}>{perfume.name}</Text>
				</View>
			</TouchableOpacity>
			<Text style={styles.price}>${perfume.price}</Text>
			<TouchableOpacity onPress={onAddToCart} style={styles.addToCart}>
				<FontAwesome name="shopping-cart" size={20} color="#fff" />
				<Text style={styles.addToCartText}>Add to Cart</Text>
			</TouchableOpacity>
		</Animated.View>
	)
};
const cardWidth = width / 2 - 20; // We want two cards in a row, 20 is for padding
const cardHeight = cardWidth * 1.5; // Define a ratio for the height relative to the width.

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: 150,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	productName: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	addToCart: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: primary,
		padding: 10,
	},
	addToCartText: {
		color: '#fff',
		marginLeft: 5,
	},
	price: {
		margin: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default CardPerfume;
