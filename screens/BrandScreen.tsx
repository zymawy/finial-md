import * as React from 'react';
import {DeviceEventEmitter, Dimensions, StyleSheet
} from 'react-native';
import { FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import {RootStackScreenProps, RootTabScreenProps} from "../types";
import useCartManagement from "../StateManagement/CartManagement";
import customAxios from "../axios/axios";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {TabActions} from "@react-navigation/native";
import CardPerfume from "../components/CardPerfume";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { storeData } from '../StateManagement/CartManagement';

export default function BrandScreen({ route, navigation }: RootTabScreenProps<"BrandScreen">) {

	const { state, dispatch } = useCartManagement();
	const { brandId, brandName} = route.params;
	console.log(brandId)
	const [perfumes, setPerfumes] = useState<{
		data: string[];
		error: string;
		loading: boolean;
		isBanner: boolean;
	}>({ data: [], error: "", loading: false,  isBanner: false });

	const fetchPerfumes = async () => {
		try {
			setPerfumes((prev) => ({ ...prev, loading: true }));
			const res = await customAxios.get(`/perfumes?brand=${brandId}`);
			console.log(res.data)
			setPerfumes((prev) => ({
				...prev,
				data: res.data.data,
				loading: false,
			}));
		} catch (err) {
			setPerfumes((prev) => ({
				...prev,
				error: err?.message || 'There Has Been Some Error ',
				loading: false,
			}));
		}
	};

	useEffect(() => {
		fetchPerfumes();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchPerfumes(); // Refetch products when the screen comes into focus
		}, [brandId]) // Refetch whenever brandId changes
	);

	const { width } = Dimensions.get('window');
	const cardWidth = width / 2 - 20; // screen width divided by 2 minus margin

	const onAddToCart = async  (perfume) => {
		storeData(perfume)
			.then(async r => {
				DeviceEventEmitter.emit('cart.added', {perfume});
				console.warn('Store Done')
			});
	}

	const  renderPerfume = ({item: perfume, index: index}) =>  {
		return (
			<CardPerfume
				perfume={perfume}
				style={{ width: cardWidth }} // set the width of each card here
				onProductPress={() => navigation.dispatch(
					TabActions.jumpTo("PerfumeDetail", { perfume: perfume })
				)}
				onAddToCart={() => onAddToCart(perfume)}
			/>
		)
	}

	const getPerfumes = () => {

		return perfumes.data
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<FontAwesome name="building" size={24} color="#333" style={styles.icon} />
				<Text style={styles.title}>{brandName}</Text>
			</View>
			<FlatList
				legacyImplementation={true}
				data={perfumes.data}
				renderItem={renderPerfume}
				keyExtractor={(item, index) => index.toString()}
				numColumns={2} // number of cards in one row
				columnWrapperStyle={styles.row} // applying the styles to each row
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 1,
	},
	row: {
		flex: 1,
		justifyContent: "space-around",
		marginBottom: 10,
	},
	titleContainer: {
		backgroundColor: '#f9f9f9',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		marginVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	list: {
		flex: 1
	},
	icon: {
		marginRight: 10, // add some margin to the right of the icon
	},
});
