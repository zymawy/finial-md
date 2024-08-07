import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
	ActivityIndicator,
	 FlatList,
	StyleSheet
} from 'react-native';

import { Text, View } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import {useEffect, useState} from "react";
import { primary, secondary } from "../constants/Colors";
import { getPerfumesByReference } from '../data/perfumes';
import Perfume from '../components/Perfume';

export default function PerfumesScreen({
										   navigation,
										   route
								   }: RootStackScreenProps<"PerfumesScreen">) {

	    const [perfumes, setPerfumes] = useState<{
        data: any[];
        error: string;
        loading: boolean;
        isBanner: boolean;
    }>({ data: [], error: "", loading: false, isBanner: false });
	
	const { reference_type, reference_id } = route.params;
	
	useEffect(() => {
		if(reference_type === 'all') {
			setPerfumes({
				data: [],
				error: "Loading",
				loading: true,
				isBanner: false,
			});
			setTimeout(() => {
				setPerfumes(getPerfumesByReference(reference_type, reference_id));
			}, 300)
		} else {
			setPerfumes(getPerfumesByReference(reference_type, reference_id));
		}
	}, [reference_type, reference_id]);
	

	const  renderPerfume = ({item: perfume, index: index}) =>  {
		return (
			<Perfume perfume={perfume} />
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
				numColumns={2}
				columnWrapperStyle={styles.row}
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
