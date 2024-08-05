import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {StyleSheet, View, TextInput, Button} from "react-native";
import useCartManagement from "../StateManagement/CartManagement";
import {
	StackActions,
	TabActions,
	useNavigation
} from "@react-navigation/native";

export default function SerachBar() {
  const [searchText, setSearchText] = React.useState<string>("");
	const { dispatch } = useNavigation();
	const handleSearch = (e) => {
		dispatch(
			TabActions.jumpTo("SearchScreen", { searchQuery: searchText })
		)
	};

  return (
	  <View style={styles.container}>
		  <FontAwesome name="search" size={25} style={styles.icon} color="grey" />
		  <TextInput
			  style={styles.input}
			  value={searchText}
			  onChangeText={(text) => setSearchText(text)}
			  placeholder="Search for brands, perfumes and more"
			  placeholderTextColor="#000"
			  returnKeyType='search'
			  // autoFocus={true}
			  selectionColor={'#ddd'}
			  onSubmitEditing={handleSearch}
			  clearButtonMode="while-editing"
		  />
	  </View>
  );
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 3,
	},
	input: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 40,
		backgroundColor: "#eee",
		// borderRadius: 15,
		fontFamily: "space-mono",
		fontWeight: "700",
		color: "grey",
		marginBottom: 0
	},
	icon: {
		position: "absolute",
		zIndex: 1,
		top: 10,
		left: 10,
	},
});
