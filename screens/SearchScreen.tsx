import React, { useState, useEffect } from 'react';
import {
	View,
	ActivityIndicator,
	Dimensions,
	DeviceEventEmitter, FlatList, StyleSheet
} from 'react-native';
import customAxios from '../axios/axios';

import CardPerfume from "../components/CardPerfume";
import {TabActions} from "@react-navigation/native";
import {RootDrawerScreenProps, RootTabScreenProps} from "../types";
import {storeData} from "../StateManagement/CartManagement";
import {Text as TextOwn, Text, View as ViewOwn} from "../components/Themed";

export default function SearchScreen({ route, navigation }: RootTabScreenProps<"SearchScreen">) {
// const SearchScreen = ({ route,  }) => {
	const { searchQuery } = route.params;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const {data: { data }} = await customAxios.get('/search', { params: { q: searchQuery } });
				console.log(data)
				setData(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [searchQuery]);

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

	console.log(searchQuery)
	return (
		<View style={styles.container}>
			{loading && ! data.length ? (
				<ActivityIndicator />
			) : (
				<View>
					<ViewOwn style={styles.textContainer}>
						<TextOwn style={styles.textText}>Our Brands 🖐</TextOwn>
					</ViewOwn>
					<FlatList
						legacyImplementation={true}
						data={data}
						renderItem={renderPerfume}
						keyExtractor={(item, index) => index.toString()}
						numColumns={2} // number of cards in one row
						columnWrapperStyle={styles.row} // applying the styles to each row
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 1,
		marginTop: 20,
		color:"#fff",
		fontSize: 214,
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
	textContainer: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5
	},
	textText: {
		fontSize: 15,
	},
});
