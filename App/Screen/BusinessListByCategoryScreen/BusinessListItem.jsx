import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Color from "../../Utils/Color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();

  const styleStatus = () => {
    const styles = {
      padding: 5,
        borderRadius: 5,
        fontSize: 14,
        alignSelf: "flex-start",
        fontFamily: "outfit",
        paddingHorizontal: 7
    }

    if(booking?.bookingStatus == "Booked") {
      return {
        ...styles,
        color: Color.PRIMARY,
        backgroundColor: Color.PRIMARY_LIGHT
      }
    }

    if (booking?.bookingStatus == "Completed") {
      return {
        ...styles,
        color: Color.WHITE,
        backgroundColor: Color.GREEN_LIGHT
      }
    }

    if (booking?.bookingStatus == "Canceled") {
      return {
        ...styles,
        color: Color.WHITE,
        backgroundColor: Color.RED_LIGHT
      }
    }
  }
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
          {business?.contactPersion}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {business?.name}
        </Text>
        {booking?.id ? (
          <Text
            style={styleStatus()}
          >
            {booking?.bookingStatus === "Booked" ? 'Đã đặt' : booking?.bookingStatus === "Completed" ? "Hoàn thành" : "Đã hủy"}
          </Text>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <MaterialIcons
              name="location-pin"
              size={20}
              color={Color.PRIMARY}
            />
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
        )}
        {booking?.id ? (
          <Text>
            <AntDesign name="calendar" size={24} color={Color.PRIMARY} style={{ marginRight: 15 }} />{" "}
            {booking.date} và {booking.time}
          </Text>
        ) : null}
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
