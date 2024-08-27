import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text } from './Themed';

const { width } = Dimensions.get('window');


export default function Testimonial({ testimonial }) {
  
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starIcon = index < testimonial ? 'star' : 'star-o';
    return <FontAwesome key={index} name={starIcon} size={16} color="#FFD700" />;
  });  
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{testimonial.name}</Text>
        <View style={styles.stars}>{stars}</View>
        <Text style={styles.message}>{testimonial.message}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
});