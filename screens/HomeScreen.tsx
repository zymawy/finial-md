import React , { useRef } from "react";
import {
	ActivityIndicator,
	Dimensions, FlatList, Image, ImageBackground, Platform,
	StyleSheet, Text,
	TouchableWithoutFeedback
} from "react-native";
import {View, ScrollView, SafeAreaView} from "../components/Themed";
import { RootTabScreenProps } from "../types";
import useStateManagement from "../StateManagement/StateManagement";
import WelcomeText from "../components/WelcomeText";
import {useEffect, useState} from "react";
import {primary} from "../constants/Colors";
import FeaturedProductCarousel from "../components/FeaturedProductCarousel";
import {StatusBar} from "expo-status-bar";
import isAuthenticated from "../hooks/useAuthenticated";
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import NetInfo from '@react-native-community/netinfo';
import { BANNERS, BRANDS, PERUMES, getRandomPerfumes } from "../data/perfumes";
import Perfume from "../components/Perfume";
import Categories from "../components/Categories";


export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
	const { width } = Dimensions.get('window');
  const { state, dispatch } = useStateManagement();
	const [brands, setBrands] = useState<{
		data: string[];
		error: string;
		loading: boolean;
		isBanner: boolean;
	}>({ data: [], error: "", loading: false,  isBanner: false });
	const isAuth = isAuthenticated()
	const [isConnected, setIsConnected] = useState(false);
	const bannerRef = useRef(null);
	const [randomPerfumes, setRandomPerfumes] = useState([]);


	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			console.log("Connection type", state.type);
			console.log("Is connected?", state.isConnected);
			setIsConnected(state.isConnected);
			});

		setRandomPerfumes(getRandomPerfumes(6));

	return () => {
		unsubscribe();
		};
	}, []);


	const renderPerfume = ({ item }) =>
		<Perfume perfume={item}/>;

	const renderBrands = ({ item }) => (	
			<View style={styles.itemContainer}>
				<TouchableWithoutFeedback
				onPress={() => {
					// console.log(item);
					
				}}
				>
					<ImageBackground 
					source={item.image}
					style={styles.image}
					resizeMode="contain"
					/>
				</TouchableWithoutFeedback>	
			</View>
	);
	const renderBanner = ({ item }) => {
		return (
			<Image source={item} style={{ width: width, height: 200, resizeMode: 'cover' }} />
		);
	};


  return (
	<SafeAreaView>
		 <ScrollView>
			{/* @todo continue with search bar if time serve me.  */}
			 {/* <SerachBar onSearch={handleSearch}  /> */}
			{/* 

			 const handleSearch = (searchText) => {
		navigation.navigate('SearchScreen', { searchQuery: searchText });
	}; */}

	
	{BANNERS.length <= 0 ? (
			<View>
				<ActivityIndicator size="large" color={primary} />
			</View>
		) :
		(
			<View>
				<Carousel
					ref={bannerRef}
					data={BANNERS}
					renderItem={renderBanner}
					sliderWidth={width}
					itemWidth={width}
					autoplay
					loop
				/>
				<Pagination
					dotsLength={1}
					containerStyle={styles.paginationContainer}
					dotStyle={styles.paginationDot}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
					activeDotIndex={1}
				/>
			</View>
		)
	}

			 {brands.loading ? (
				 <View>
					 <ActivityIndicator size="large" color={primary} />
				 </View>
			 ) : brands.error.length ? (
				 <View
					 style={{
						 flex: 1,
						 alignItems: "center",
						 marginVertical: 20,
					 }}
				 >
					 <Text>{brands.error}</Text>
				 </View>
			 ) : (
				 <View>
				 <FlatList
					data={BRANDS}
					renderItem={renderBrands}
					keyExtractor={(item, index) => index.toString()}
					numColumns={4}
					columnWrapperStyle={styles.row}
					style={styles.list}
					scrollEnabled={false}
				 />

				<FeaturedProductCarousel />


				<Categories />

				<FeaturedProductCarousel />

				<FlatList
						 data={randomPerfumes}
						 renderItem={renderPerfume}
						 keyExtractor={(item, index) => index.toString()}
						 numColumns={2}
						 columnWrapperStyle={styles.row}
						 style={styles.list}
						 scrollEnabled={false}
					 />

				<FeaturedProductCarousel 
				layoutCarousel="tinder"
				layoutCardOffCarousel={3}
				/>


				 <Carousel
					ref={bannerRef}
					data={BANNERS}
					renderItem={renderBanner}
					sliderWidth={width}
					itemWidth={width}
					hasParallaxImages={true}
					loop={true}
					loopClonesPerSide={2}
					autoplay={true}
					autoplayDelay={500}
					autoplayInterval={3000}
					inactiveSlideScale={0.94}
					inactiveSlideOpacity={0.7}	
				/>
				 </View>
			 )}

			 <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		 </ScrollView>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
	icon: {
		marginRight: 10,
	},
	textContainer: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5
	},
	textText: {
		fontSize: 15,
	},
	separator: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginHorizontal: 10,
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
	itemContainer: {
		flex: 1,
		margin: 10,
		backgroundColor: '#fff',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
		alignItems: 'center',
		padding: 10,
	},
	image: {
		width: '100%',
		height: 100,
		resizeMode: 'contain',
		marginBottom: 5,
	},
	brandName: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#333',
		textAlign: 'center',
	},
	row: {
		justifyContent: 'space-between',
	},
	list: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
});
