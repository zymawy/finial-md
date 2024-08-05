import React, {useEffect, useState} from 'react';
import { FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import {RootStackScreenProps} from "../types";
import { Text, View } from '../components/Themed';
import customAxios from "../axios/axios";

export default function OrderScreen({
										  navigation,
										  route
									  }: RootStackScreenProps<"OrderScreen">) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [orders, setOrders] = useState<{
		data: string[];
		error: string;
		loading: boolean;
		isBanner: boolean;
	}>({ data: [], error: "", loading: false,  isBanner: false });
	useEffect(() => {
		const fetchPerfumes = async () => {
			try {
				setOrders((prev) => ({ ...prev, loading: true }));
				const res = await customAxios.get("/orders");
				setOrders((prev) => ({
					...prev,
					data: res.data.data,
					loading: false,
				}));
			} catch (err) {

				setOrders((prev) => ({
					...prev,
					error:'There Has Been Some Error ',
					loading: false,
				}));
			}
		};

		fetchPerfumes();
	}, []);

	const handlePress = (order) => {
		setSelectedOrder(order);
		setModalVisible(true);
	};

	const handleClose = () => {
		setModalVisible(false);
		setSelectedOrder(null);
	};

	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<Text style={styles.title}>Order ID: {item.id}</Text>
			<View style={styles.divider} />
			<Text style={styles.text}>Date: {item.created_at}</Text>
			<Text style={styles.text}>Total: ${item.total}</Text>
			<Text style={styles.text}>Status: {item.status || 'Delivered'}</Text>
			<TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
				<Text style={styles.buttonText}>View Details</Text>
			</TouchableOpacity>
		</View>
	);


	return (
		<View style={styles.container}>
			<FlatList
				data={orders.data}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>

			{selectedOrder && (
				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
				>
					<View style={styles.modalContainer}>
						<Text style={styles.title}>Order Details</Text>
						<Text>Order ID: {selectedOrder.id}</Text>
						<Text>Date: {selectedOrder.created_at}</Text>
						<Text>Total: ${selectedOrder.total}</Text>
						<Text>Status: {selectedOrder.status || 'Delivered'}</Text>
						<TouchableOpacity style={styles.button} onPress={handleClose}>
							<Text style={styles.buttonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	card: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		backgroundColor: '#fff',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		color: '#000',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
	},
	divider: {
		height: 1,
		backgroundColor: '#ddd',
		marginVertical: 10,
	},
	text: {
		marginBottom: 10,
		color: '#000',
	},
	button: {
		backgroundColor: '#3498db',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
	},
	modalContainer: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
