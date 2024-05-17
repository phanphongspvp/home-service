import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BookingScreen from "../Screen/BookingScreen/BookingScreen";
import BusinessDetailsScreen from "../Screen/BusinessDetailsScreen/BusinessDetailsScreen";

const Stack = createStackNavigator();

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BookingMain"
        component={BookingScreen}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BusinessDetailsScreen}
      />
    </Stack.Navigator>
  );
}
