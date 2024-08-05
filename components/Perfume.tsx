import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Pressable from "./Pressable";
import { View, Text } from "./Themed";
import Carousel from 'react-native-new-snap-carousel';
import {storeData} from "../StateManagement/CartManagement";
import { TouchableOpacity } from "react-native-gesture-handler";
import { primary } from "../constants/Colors";
import {TabActions, useNavigation} from '@react-navigation/native';

export default function Perfume({
  perfume,
}: {
  name: string;
  perfume: {
    image: string,
    price: number | string,
    name: string,
    gallery: Array<any>
  };
  image: string;
  onPress: () => void;
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
}) {
  const colorScheme = useColorScheme() === "dark" ? "light" : "dark";
  const galleryRef = useRef(null);
  const navigation = useNavigation();

  const [componentWidth, setComponentWidth] = useState(0);

  const handleLayout = (event) => {
    if (componentWidth === 0) {
      const { width } = event.nativeEvent.layout;
      setComponentWidth(width);
    }
  };

  const renderBanner = ({ item }) => {
    return (
      <Image source={item} style={{ width: componentWidth, height: 200, resizeMode: 'cover' }} />
    );
  };


	const onAddToCart = async  () => {
		console.log(perfume);
		
		storeData(perfume)
			.then(async r => {
				DeviceEventEmitter.emit('cart.added', {perfume});
				console.warn('Store Done')
			});
	}

  return (
    <Pressable style={styles.card}
      onLayout={handleLayout}
    >
      {componentWidth > 0 && (
        <Carousel
          ref={galleryRef}
          data={perfume.gallery}
          renderItem={renderBanner}
          sliderWidth={componentWidth}
          itemWidth={componentWidth}
          autoplay
          loop
        />
      )}
      <View style={styles.infoContainer}>
		<Pressable 
		onPress={() => navigation.dispatch(
			TabActions.jumpTo("PerfumeDetail", { perfume: perfume })
		  )}>
        	<Text style={styles.name}>{perfume.name}</Text>
		</Pressable>
        <Text style={styles.price}>$ {perfume.price}</Text>
		<TouchableOpacity onPress={onAddToCart} style={styles.addToCart}>
				<FontAwesome name="shopping-cart" size={20} color="#fff" />
				<Text style={styles.addToCartText}>Add to Cart</Text>
			</TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
    maxWidth: 220,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  addToCart: {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: primary,
	padding: 10,
},
	addToCartText: {
		color: '#fff',
		marginLeft: 5,
	},
});
