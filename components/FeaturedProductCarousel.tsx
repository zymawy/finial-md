import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import {TabActions, useNavigation} from '@react-navigation/native';
import { Dimensions } from 'react-native';
import customAxios from "../axios/axios";
import { primary } from '../constants/Colors';

const { width } = Dimensions.get('window');

const FeaturedProductCarousel = ({
	layoutCarousel = 'default',
	layoutCardOffCarousel = 1
}) => {
	const navigation = useNavigation();
	const [activeSlide, setActiveSlide] = useState(0);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setProducts((prev) => ({ ...prev, loading: true }));
			const res = await customAxios.get("/perfumes?limited=3");
			setProducts((prev) => ({
				...prev,
				data: res.data.data,
				loading: false,
			}));
		} catch (err) {
			setProducts((prev) => ({
				...prev,
				error: err?.message || 'There Has Been Some Error ',
				loading: false,
			}));
		}
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => navigation.dispatch(
				TabActions.jumpTo("PerfumeDetail", { perfume: item })
			)}>
				<View style={styles.card}>
					<Image source={{ uri: item.image }} style={styles.image} />
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
				</View>
			</TouchableOpacity>
		);
	};


	return (
		<View style={styles.container}>
			<Carousel
				layout={layoutCarousel || 'default'}
				layoutCardOffset={layoutCardOffCarousel || 1}
				data={products?.data || []}
				renderItem={renderItem}
				sliderWidth={width}
				itemWidth={width * 0.75}
				onSnapToItem={index => setActiveSlide(index)}
				autoplay
				loop
			/>
			<Pagination
				dotsLength={products?.data?.length || 0}
				activeDotIndex={activeSlide}
				containerStyle={styles.paginationContainer}
				dotStyle={styles.paginationDot}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	card: {
		borderRadius: 8,
		backgroundColor: '#fff',
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: 200,
	},
	name: {
		marginTop: 16,
		fontSize: 18,
		fontWeight: 'bold',
	},
	price: {
		marginTop: 8,
		fontSize: 16,
		color: primary,
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
});

export default FeaturedProductCarousel;
