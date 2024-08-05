import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export default function WelcomeText({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {name} 🖐</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
	  marginLeft: 5
  },
  text: {
    fontSize: 12,
  },
});
