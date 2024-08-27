/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import { createURL } from "expo-linking";

import { RootStackParamList } from "../types";
const prefix = createURL("/");


const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Root: {
        screens: {
          Main: {
            screens: {
              Home: {
                screens: {
                  HomeScreen: "home",
                },
              },
              Add: {
                screens: {
                  TabAddScreen: "add",
                },
              },
              TabTwo: {
                screens: {
                  TabTwoScreen: "two",
                },
              },
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
