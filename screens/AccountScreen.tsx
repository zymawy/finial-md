import * as React from 'react';
import {
	ImageBackground,
	StyleSheet,
} from 'react-native';

import { Text, View } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import Button from "../components/Button";
import useStateManagement from "../StateManagement/StateManagement";
import {MonoText} from "../components/StyledText";
import {primary} from "../constants/Colors";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../StateManagement/Actions";
import useCartManagement from "../StateManagement/CartManagement";
import {useState} from "react";
import {TabActions} from "@react-navigation/native";



export default function AccountScreen({
										  navigation,
										  route
									  }: RootStackScreenProps<"AccountScreen">): JSX.Element {

	const { state, dispatch } = useStateManagement();
	const { dispatch: cartDispatch } = useCartManagement();
	const [user, setUser] = useState(state.user);

	const [isEditing, setIsEditing] = useState(false);
	const handleChange = (field, value) => {
		setUser({
			...user,
			[field]: value,
		});
	};
	const logout = async () => {
				try {
					await AsyncStorage.clear();
					await  AsyncStorage.removeItem('@cart')
					await SecureStore.deleteItemAsync("user-token");
					dispatch(
						Actions.setUser(null)
					);

					cartDispatch(
						Actions.setCartItems([])
					);
					cartDispatch(
						Actions.setTotalCartItems(0)
					)

					cartDispatch(
						Actions.setTotalPrice(0)
					)

				} catch (err) {
					console.warn(err);
				}
		navigation.navigate("Login");
	}

	return (
		<View style={styles.container}>
			<View style={[styles.profile, { borderColor: primary }]}>
				<ImageBackground
					source={{uri: "https://picsum.photos/200"}}
					resizeMode="cover"
					style={styles.image}
				></ImageBackground>
			</View>
			<MonoText>{state.user?.name}</MonoText>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<View style={styles.buttonGroup}>
				<Button text="Edit"  disabled={false} onPress={() => setIsEditing(true)} />
				<Button text="Orders" disabled={false} onPress={() =>
					navigation.dispatch(
						TabActions.jumpTo("OrderScreen")
					)
				} />
				<Button text="Logout" onPress={logout} disabled={false} />
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
