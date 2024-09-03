/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerScreenProps } from "@react-navigation/drawer";


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootDrawerParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  PerfumeDetail: undefined;
  PerfumesScreen: undefined;
  Register: undefined;
  AccountScreen: undefined;
  CartScreen: undefined;
	OrderScreen: undefined;
  BrandScreen:{brand: object};
  PerfumeScreen: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Products: undefined;
  Add: undefined;
  Search: undefined;
  TabTwo: undefined;
  PerfumeDetail: undefined;
  PerfumesScreen: undefined;
  AccountScreen: undefined;
CartScreen: undefined;
	OrderScreen: undefined;
  BrandScreen:{brand: object};
  PerfumeScreen: undefined;
};

export type RootDrawerParamList = {
  Main: NavigatorScreenParams<RootTabParamList>;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamList, Screen>,
    BottomTabScreenProps<RootTabParamList>
  >;
