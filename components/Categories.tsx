import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { primary } from "../constants/Colors";
import capitalizeString from "../helpers/capitalize";
import Category from "./Category";
import { Text, View } from "./Themed";
import customAxios from "../axios/axios";

export default function Categories() {
  const [categories, setCategories] = useState<{
    data: string[];
    error: string;
    loading: boolean;
  }>({ data: [], error: "", loading: false });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories((prev) => ({ ...prev, loading: true }));
        const res = await customAxios.get("/categories?limited=5");
        setCategories((prev) => ({
          ...prev,
          data: res.data.data,
          loading: false,
        }));
      } catch (err) {
        setCategories((prev) => ({
          ...prev,
          error: err?.message || 'There Has Been Some Error ',
          loading: false,
        }));
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular categories</Text>
        {/*<Pressable>*/}
        {/*  <Text style={styles.more}>*/}
        {/*    See all <FontAwesome name="arrow-right" />*/}
        {/*  </Text>*/}
        {/*</Pressable>*/}
      </View>
      <View style={styles.content}>
          {categories.loading ? (
            <View style={{ marginTop: 15 }}>
              <ActivityIndicator size="large" color={primary} />
            </View>
          ) : categories.error.length ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>{categories.error}</Text>
            </View>
          ) : (
            categories.data.map((category: any, idx: number) => (
              <Category
                key={`category-${idx}`}
                name={capitalizeString(category.name)}
                icon={category.icon}
                image={category.image}
              />
            ))
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    // width: "100%",
    borderRadius: 15,
  	marginBottom:201,
	  backgroundColor: 'white'
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
    fontSize: 21,
	  bottom:12
  },
  more: {
    fontSize: 12,
    color: primary,
  }
});
