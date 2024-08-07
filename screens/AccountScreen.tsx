import * as React from 'react';
import {
	ImageBackground,
	StyleSheet,
} from 'react-native';

import { Text, View } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import Button from "../components/Button";
import {primary} from "../constants/Colors";
import useCartManagement from "../StateManagement/CartManagement";
import {useState} from "react";
import {TabActions} from "@react-navigation/native";



export default function AccountScreen({
										  navigation,
										  route
									  }: RootStackScreenProps<"AccountScreen">): JSX.Element {
	const { dispatch: cartDispatch } = useCartManagement();

	return (
		<View style={styles.container}>
			<View style={[styles.profile, { borderColor: primary }]}>
				<ImageBackground
					source={{uri: "https://picsum.photos/200"}}
					resizeMode="cover"
					style={styles.image}
				></ImageBackground>
			</View>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<View style={styles.buttonGroup}>
				<Button text="Orders" disabled={false} onPress={() =>
					navigation.dispatch(
						TabActions.jumpTo("OrderScreen")
					)
				} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	button: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 20,
		height: 1,
		width: '100%',
	},
	profile: {
		width: 42,
		height: 42,
		backgroundColor: "grey",
		borderRadius: 21,
		marginRight: 15,
		overflow: "hidden",
		borderWidth: 2,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	thumbnail: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	info: {
		fontSize: 20,
		margin: 10,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: '100%',
		marginBottom: 10,
		paddingLeft: 8,
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
	},
});
