import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
	ActivityIndicator,
	Dimensions, FlatList,
	StyleSheet
} from 'react-native';

import { Text, View } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import CardPerfume from "../components/CardPerfume";
import {TabActions} from "@react-navigation/native";
import {useEffect, useState} from "react";
import customAxios from "../axios/axios";
import {storeData} from "../StateManagement/CartManagement";
import {FontAwesome} from "@expo/vector-icons";
import { primary, secondary } from "../constants/Colors";

export default function PerfumesScreen({
										   navigation,
										   route
								   }: RootStackScreenProps<"PerfumesScreen">) {

	const [perfumes, setPerfumes] = useState<{
		data: string[];
		error: string;
		loading: boolean;
		isBanner: boolean;
	}>({ data: [], error: "", loading: false,  isBanner: false });

	const { width } = Dimensions.get('window');
	const cardWidth = width / 2 - 20;
	const category = route.params;

	console.log(category);
	

	const onAddToCart = async  (perfume) => {
		storeData(perfume)
			.then(async r => {
				DeviceEventEmitter.emit('cart.added', {perfume});
				console.warn('Store Done')
			});
	}


	useEffect(() => {
		const fetchPerfumes = async () => {
			try {
				setPerfumes((prev) => ({ ...prev, loading: true }));
				const res = await customAxios.get("/perfumes");
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

		fetchPerfumes();
	}, []);

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

	return (
		perfumes?.data?.length <= 0 ? (
			<View>
				<ActivityIndicator size="large" color={primary} />
			</View>
		) : (
		<View style={styles.container}>
			<FlatList
				legacyImplementation={true}
				data={perfumes.data}
				renderItem={renderPerfume}
				keyExtractor={(item, index) => index.toString()}
				numColumns={2} // number of cards in one row
				columnWrapperStyle={styles.row} // applying the styles to each row
			/>
		</View>)
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
