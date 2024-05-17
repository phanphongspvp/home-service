import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Color from "../../Utils/Color";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutMe";
import BookingModal from "./BookingModal";

export default function BusinessDetailsScreen() {
  const [business, setBusiness] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const param = useRoute().params;
  useEffect(() => {
    setBusiness(param.business);
  }, [param]);

  const onMessageBtnClick = () => {
    Linking.openURL("mailto:" + business?.email + "?subject=Tôi đang tìm kiếm Dịch vụ của bạn&body=Chào bạn,");
  }

  const sections = [
    {
      key: "image",
      content: business && (
        <Image
          source={{ uri: business?.images[0]?.url }}
          style={styles.image}
        />
      ),
    },
    {
      key: "info",
      content: business && (
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            {business?.name}
          </Text>
          <View style={styles.subContainer}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Color.PRIMARY,
                fontSize: 20,
              }}
            >
              {business?.contactPersion} ⭐
            </Text>
            <Text
              style={{
                color: Color.PRIMARY,
                backgroundColor: Color.PRIMARY_LIGHT,
                padding: 5,
                borderRadius: 5,
                fontSize: 13,
              }}
            >
              {business?.category?.name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
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
              {business?.address}
            </Text>
          </View>
        </View>
      ),
    },
    {
      key: "about",
      content: business && <BusinessAboutMe business={business} />,
    },
    {
      key: "photos",
      content: business && <BusinessPhotos business={business} />,
    },
  ];

  return (
    business && (
      <View style={{ flex: 1, position: "relative" }}>
        <TouchableOpacity
          style={styles.btnBackContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color={Color.WHITE} />
        </TouchableOpacity>
        <FlatList
          style={styles.container}
          data={sections}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>{item.content}</View>
          )}
          keyExtractor={(item) => item.key}
        />
        <View
          style={{ display: "flex", flexDirection: "row", gap: 8, margin: 4 }}
        >
          <TouchableOpacity
            style={styles.messageBtn}
            onPress={() => onMessageBtnClick()}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Color.PRIMARY,
                fontSize: 18,
              }}
            >
              Nhắn tin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Color.WHITE,
                fontSize: 18,
              }}
            >
              Đặt trước
            </Text>
          </TouchableOpacity>
        </View>

        {/* Booking modal */}
        <Modal animationType="slide" visible={showModal}>
          <BookingModal
            businessId={business?.id}
            hiddenModal={() => setShowModal(false)}
          />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBackContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 100,
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    borderColor: Color.WHITE,
    borderRadius: 100,
    flex: 1,
  },
});
