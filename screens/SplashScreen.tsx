import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Image } from "react-native";
import { SafeAreaView } from "../components/Themed";

export default function SplashScreen() {
  const imageSplesh = require('./../assets/images/splesh/splesh.png');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInOut = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]);

    Animated.loop(fadeInOut).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.contentStyle}>
      <Animated.View style={{ ...styles.imageContainer, opacity: fadeAnim }}>
        <Image source={imageSplesh} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300, 
    height: 300,
  },
});
