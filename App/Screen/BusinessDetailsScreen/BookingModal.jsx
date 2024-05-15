import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BookingModal({ hiddenModal }) {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => hiddenModal()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Đặt trước
        </Text>
      </TouchableOpacity>
    </View>
  );
}
