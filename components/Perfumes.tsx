import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	FlatList
} from "react-native";
import { primary } from "../constants/Colors";
import capitalizeString from "../helpers/capitalize";
import Perfume from "./Perfume";
import PerfumeBanner from "./PerfumeBanner";
import Pressable from "./Pressable";
import { Text, View } from "./Themed";
import customAxios from "../axios/axios";
import {TabActions, useNavigation} from "@react-navigation/native";

export default function Perfumes({
				 type,
				 }: {
	type: string;
}) {
  const [perfumes, setPerfumes] = useState<{
    data: string[];
    error: string;
    loading: boolean;
    isBanner: boolean;
  }>({ data: [], error: "", loading: false,  isBanner: false });

	let isBanner = type == 'banner';
	const navigation = useNavigation();


	useEffect(() => {
    const fetchPerfumes = async () => {
      try {
		  setPerfumes((prev) => ({ ...prev, loading: true }));
        const res = await customAxios.get("/perfumes");
		  setPerfumes((prev) => ({
          ...prev,
          data: res.data.data,
          loading: false,
        }));
      } catch (err) {
		  setPerfumes((prev) => ({
          ...prev,
          error: err?.message || 'There Has Been Some Error ',
          loading: false,
        }));
      }
    };

	  fetchPerfumes();
  }, []);

	const  renderPerfume = ({item: perfume, index: index}) =>  {
		return (
			isBanner ? (
						<View style={styles.containerBanner}>
							<PerfumeBanner
								key={`banner-perfume-${perfume.id}`}
								name={capitalizeString(perfume.name)}
								url={perfume.image}
								perfume={perfume}
								index={index}
							/>
						</View>
					)
					: (
						<View style={styles.productsList}>
						<Perfume
							key={`perfume-${perfume.id}`}
							name={capitalizeString(perfume.name)}
							icon={'s'}
							image={perfume.image}
							perfume={perfume}
						/>
						</View>
					)
		);
	}

	const getPerfumes = () => {

		return isBanner ? perfumes.data.slice(1, 2) : perfumes.data
	}

  return (
      <View>
          {perfumes.loading ? (
            <View style={{ marginTop: 15 }}>
              <ActivityIndicator size="large" color={primary} />
            </View>
          ) : perfumes.error.length ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>{perfumes.error}</Text>
            </View>
          ) : (
			  <FlatList
				  // contentContainerStyle={styles.productsListContainer}
				  keyExtractor={(perfume) => perfume.id.toString()}
				  data={getPerfumes()}
				  renderItem={renderPerfume}
			  />
          )}
      </View>
  );
}

const styles = StyleSheet.create({
	containerBanner: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		// justifyContent: 'center',
		// flex: 1,
		// display: 'flex',
		// paddingTop: 10,
		// alignItems: "center",
		// flexDirection: 'row',
		// paddingHorizontal: 12,

	},
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 15,		backgroundColor: '#fff',


  },
  header: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
  },
	productsList: {
		backgroundColor: '#eeeeee',
	},
	productsListContainer: {
		// paddingVertical: 8,
		// marginHorizontal: 8,
	}
});
