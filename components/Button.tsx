import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { primary } from "../constants/Colors";
import { Text } from "./Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function Button({
  text,
  onPress,
  disabled,
  icon='shopping-cart',
  disabledText="",
  style=[],
  disabledColor,
  disabledIcon
}: {
  text: string;
  onPress: () => void;
  disabled: boolean;
  icon: string;
  disabledText: string;
  style?: any[],
  disabledColor:string,
  disabledIcon: string
}) {
  return (
    <TouchableOpacity onPress={onPress} 
    style={[
      styles.button,
      style,
      disabled && { backgroundColor: disabledColor || '#cccccc' }
  ]}
    disabled={disabled}
    >
      {!disabled ? (
                <>
                    {icon && <FontAwesome name={icon} size={20} color="#fff" style={styles.icon} />}
                    <Text style={styles.buttonText}>{text}</Text>
                </>
            ) : (
                <>
                    {disabledIcon && <FontAwesome name={disabledIcon} size={20} color="#fff" style={styles.icon} />}
                    <Text style={styles.buttonText}>{disabledText || <ActivityIndicator size="small" color="#fff" />}</Text>
                </>
            )}
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cnt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
    padding: 10,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    marginLeft: 5,
  },
disabledButton: {
    backgroundColor: '#cccccc',
},
   button: {
        backgroundColor: primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 5,
        color: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
