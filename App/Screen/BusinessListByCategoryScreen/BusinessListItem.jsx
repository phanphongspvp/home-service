import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Color from "../../Utils/Color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItem({ business }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("BusinessListDetail", {
          business: business,
        })
      }
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={{ fontFamily: "outfit", color: Color.GRAY, fontSize: 15 }}>
          {business.contactPersion}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {business.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MaterialIcons name="location-pin" size={20} color={Color.PRIMARY} />
          <Text
            style={{
              fontFamily: "outfit",
              color: Color.GRAY,
              fontSize: 16,
              marginTop: 3,
            }}
          >
            {business.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    gap: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
