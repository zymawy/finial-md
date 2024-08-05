import { TabActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {StyleSheet, ImageBackground, Dimensions} from "react-native";
import Pressable from "./Pressable";
import { Text, View } from "./Themed";
import { primary } from "../constants/Colors";
import {FontAwesome} from "@expo/vector-icons";

export default function Banner({
								   url,
								   name,
								   perfume,
								   index
							   }: {
	name: string;
	perfume: object;
	url: string;
	index: string|number|any
}) {
  const navigation = useNavigation();
	const cardGap = 16;

	const cardWidth = (Dimensions.get('window').width - cardGap * 3);


	return (
    <View style={
		{
			marginTop: cardGap - 10,
			marginBottom: cardGap + 10,
			marginLeft:  cardGap,
			width: cardWidth,
			height: 180,
			backgroundColor: 'white',
			borderRadius: 16,
			shadowOpacity: 0.2,
			justifyContent: 'center',
			alignItems: 'center',}
	} >
      <ImageBackground source={{
		  uri: url,
	  }} resizeMode="cover" style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.contentTitle}>
			  { cardWidth }
          </Text>
          <Pressable
            onPress={() => navigation.dispatch(
				TabActions.jumpTo("PerfumeDetail", { perfume: perfume })
			)}
          >
            <View style={styles.contentBtn}>
              <Text lightColor="#fff" darkColor="#fff">
				  <FontAwesome name="eye" size={15} style={styles.icon} color="blue" />

				  Detail
              </Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
	card: {
		// marginTop: cardGap,
		// marginLeft: id % 2 !== 0 ? cardGap : 0,
		// width: cardWidth,
		// height: 180,
		// backgroundColor: 'white',
		// borderRadius: 16,
		// shadowOpacity: 0.2,
		// justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: 'white',
		// borderRadius: 16,
		// shadowOpacity: 0.3,
		// shadowRadius: 4,
		// shadowColor: 'black',
		// shadowOffset: {
		// 	height: 0,
		// 	width: 0,
		// },
		// elevation: 1,
		// marginVertical: 20,
		// flexDirection: "row",

	},
	infoContainer: {
		padding: 20,
	},

	// container: {
	// 	marginBottom: 20,
	// 	// width: "100%",
	// 	// height: 200,
	// 	// overflow: "hidden",
	// 	borderRadius: 20,
	// },
	banner: {
	// 	// width: "100%",
	// 	// height: "100%",
	},
	bannerContent: {
	// 	left: 20,
	// 	top: 10,
	// 	backgroundColor: "transparent",
	// 	width: "70%",
	},
	contentTitle: {
	// 	fontSize: 20,
	// 	marginBottom: 20,
	},
	contentBtn: {
	// 	paddingVertical: 15,
	// 	paddingHorizontal: 15,
	// 	backgroundColor: primary,
	// 	width: 150,
		borderRadius: 20,
	},
	icon: {
	// 	position: "absolute",
	// 	zIndex: 1,
	// 	top: 30,
	// 	left: 10,
	},
});
