import React, { useRef } from 'react';
import {
	Text,
	Image,
	StyleSheet,
	DeviceEventEmitter,
	Dimensions, Animated,TouchableOpacity
} from 'react-native';
import {RootStackScreenProps} from "../types";
import useCartManagement, { storeData } from '../StateManagement/CartManagement';
import {View, ScrollView} from "../components/Themed";
import {FontAwesome} from "@expo/vector-icons";
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import { primary } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function PerfumeScreen({
	navigation,
   route
  }: RootStackScreenProps<"PerfumeDetail">) {
	const { state: cartState, dispatch: cartDispatch } = useCartManagement();
	// @ts-ignore
	const { perfume = null } = route?.params;

	const carouselRef = useRef(null);
	const scrollY = new Animated.Value(0);
	const [activeSlide, setActiveSlide] = React.useState(0);

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { y: scrollY } } }],
		{ useNativeDriver: true },
	);

	const renderItem = ({ item }) => {
		return (
			<Image source={{ uri: item }} style={styles.carouselImage} />
		);
	};

	const onAddToCart = () => {
		storeData(perfume, cartDispatch);
	};

	return (
		<ScrollView style={styles.container}>
			<Animated.ScrollView
				style={styles.container}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<Carousel
					ref={carouselRef}
					data={perfume.gallery}
					renderItem={renderItem}
					sliderWidth={width}
					itemWidth={width}
					onSnapToItem={index => setActiveSlide(index)}
					autoplay
					loop
				/>
				<Pagination
					dotsLength={perfume.gallery.length}
					activeDotIndex={activeSlide}
					containerStyle={styles.paginationContainer}
					dotStyle={styles.paginationDot}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
				/>
				<View style={styles.contentContainer}>
					<Text style={styles.name}>{perfume.name}</Text>
					<View style={styles.separator} />
					<Text style={styles.price}>${Number(perfume.price).toFixed(2)}</Text>
					<Text style={styles.description}>{perfume.description}</Text>
					<TouchableOpacity onPress={onAddToCart} style={styles.button}>
						<FontAwesome name="shopping-cart" size={20} color="#fff" />
						<Text style={styles.buttonText}>Add to Cart</Text>
					</TouchableOpacity>
				</View>
			</Animated.ScrollView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	carouselImage: {
		width: '100%',
		height: 200,
	},
	paginationContainer: {
		paddingVertical: 8,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 8,
		backgroundColor: primary,
	},
	contentContainer: {
		padding: 16,
		backgroundColor: '#fff',
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	separator: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginVertical: 16,
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold',
		color: primary,
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: primary,
		padding: 10,
		marginTop: 16,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		marginLeft: 8,
	},
});
