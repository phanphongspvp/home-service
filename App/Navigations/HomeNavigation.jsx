import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import BusinessListByCategoryScreen from "../Screen/BusinessListByCategoryScreen/BusinessListByCategoryScreen";
import BusinessDetailsScreen from "../Screen/BusinessDetailsScreen/BusinessDetailsScreen";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="BusinessList"
        component={BusinessListByCategoryScreen}
      />
      <Stack.Screen
        name="BusinessListDetail"
        component={BusinessDetailsScreen}
      />
    </Stack.Navigator>
  );
}
