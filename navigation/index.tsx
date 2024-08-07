import { AntDesign, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
	DrawerActions,
  useNavigation,
  TabActions,
  useFocusEffect
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ColorSchemeName, StyleSheet, TouchableOpacity } from "react-native";

import { primary, secondary } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import PerfumeScreen from "../screens/PerfumeScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import Hamburger from "../components/Hamburger";
import React, { useEffect, useState } from "react";



import {
  RootDrawerParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import LinkingConfiguration from "./LinkingConfiguration";
import Profile from "../components/Profile";
import Pressable from "../components/Pressable";
import isAuthenticated from "../hooks/useAuthenticated";
import SplashScreen from "../screens/SplashScreen";
import PerfumesScreen from "../screens/PerfumesScreen";
import OrderScreen from "../screens/OrderScreen";
import useCartManagement, { getCartItems } from "../StateManagement/CartManagement";
import { CATECORIES } from "../data/categories";
import Actions from "../StateManagement/Actions";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // just for domnatarion that I have implament splesh screen, since this is an offline app ):
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5000 ms = 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ animation: "default" }}>
          <Stack.Screen
            name="Root"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <AntDesign name="arrowleft" size={24} color={primary} />
    </TouchableOpacity>  );
};


function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { state, dispatch } = useCartManagement();

  useFocusEffect(
    React.useCallback(() => {
      // Load cart items when the screen is focused
      const loadCartItems = async () => {
        try {
          let perfumes = await getCartItems();

          dispatch(Actions.setCartItems(perfumes));
        } catch (e) {
          console.warn(e);
        }
      };
      loadCartItems();
    }, [])
  );

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: secondary,
        tabBarStyle: { ...styles.tabBar, ...styles.shadow },
        headerStyle: {
          elevation: 0,
        },
        tabBarShowLabel: false,
	  })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="home"
              size={26}
              color={color}
              // style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Hamburger />
          </Pressable>
          ),
          headerRight: () => (
            // <Pressable onPress={() => navigation.navigate("Modal")}>
              <Profile />
            // </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }: RootTabScreenProps<"CartScreen">) => ({
          tabBarBadge: state?.totalCartItems || null,
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Feather
              name="shopping-bag"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft:  () => (
            <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Hamburger />
          </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Profile />
            </Pressable>
          ),
        })}
      />

		<BottomTab.Screen
			name="OrderScreen"
			component={OrderScreen}
			options={({ navigation }: RootTabScreenProps<"OrderScreen">) => ({
				headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
				headerLeft: (props) => <BackButton {...props} />,
				headerTitleAlign: "center",
				headerRight: () => (
					<Pressable>
						<Profile />
					</Pressable>
				),
				tabBarButton: () => null,
			})}
		/>


      <BottomTab.Screen
        name="PerfumeDetail"
        component={PerfumeScreen}
		options={{
			tabBarButton: () => null,
      headerLeft: (props) => <BackButton {...props} />,
      headerShown: true,
      headerTitle: 'Perfume Detail',
		}}
      />

      <BottomTab.Screen
        name="PerfumesScreen"
        component={PerfumesScreen}
        options={({ navigation }: RootTabScreenProps<"PerfumesScreen">) => ({
          initialParams: {
            reference_type: 'all',
            reference_id: null
          },
          tabBarButton: props => (
            <TouchableOpacity {...props}  onPress={() => navigation.dispatch(
              TabActions.jumpTo('PerfumesScreen', {
                reference_type: 'all',
                reference_id: null,
              })
            )} />
          ),
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Feather
              name="package"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Hamburger />
          </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Profile />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={({ navigation }: RootTabScreenProps<"AccountScreen">) => ({
          headerTitleStyle: { fontFamily: "space-mono", fontWeight: "700" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Feather
              name="user"
              size={26}
              color={color}
              style={{ marginBottom: 10 }}
            />
          ),
          headerLeft: () => (
            <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Hamburger />
          </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Profile />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {CATECORIES.map((category, index) => (
        <DrawerItem
          key={category.id}
          label={category.title}
          onPress={() => {
            props.navigation.dispatch(
              TabActions.jumpTo("PerfumesScreen", {
                reference_type: 'category',
                reference_id: category.id
              })
            );
            props.navigation.closeDrawer();
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        drawerActiveTintColor: primary,
        drawerInactiveTintColor: secondary,
        drawerLabelStyle: {
          fontFamily: "space-mono",
          fontWeight: "700",
          fontSize: 16,
        },
      }}
      initialRouteName="Main"
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ title: "Home" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBar: {
    elevation: 0,
    borderTopWidth: 0,
    height: 60,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      height: 10,
      width: 10,
    },
  },
});
