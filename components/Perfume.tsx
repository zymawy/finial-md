import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
} from "react-native";
import Pressable from "./Pressable";
import { View, Text } from "./Themed";
import Carousel from 'react-native-new-snap-carousel';
import useCartManagement, {storeData, getCartItems } from "../StateManagement/CartManagement";
import Lay from "../constants/Layout";
import {TabActions, useNavigation} from '@react-navigation/native';
import Button from "./Button";
import Actions from "../StateManagement/Actions";

const  screenWidth = Lay.window.width;


export default function Perfume({
  perfume
}: {
  name: string;
  perfume: {
    image: string,
    price: number | string,
    name: string,
    gallery: Array<any>
    quantity: number,
  };
  image: string;
  onPress: () => void;
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
}) {
  const { state: cartState, dispatch: cartDispatch } = useCartManagement();
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


  const onAddToCart = () => {
    storeData(perfume, cartDispatch);
  };

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
        <Text style={styles.name} numberOfLines={1}>{perfume.name}</Text>
      </Pressable>
      <Text style={styles.price}>$ {perfume.price}</Text>
      <Button 
      disabled={perfume.quantity <= 0 }  
      icon="shopping-cart" 
      onPress={onAddToCart} text={"Add to Cart"}  
      disabledText="sold out"
      disabledColor="red"
      disabledIcon="times-circle" 
      />
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
    margin: 10, // Adjusted margin for better spacing
    flex: 1,
    maxWidth: (screenWidth / 2) - 20, // Adjust width to fit two cards per row
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    flexShrink: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#888',
  },
});
