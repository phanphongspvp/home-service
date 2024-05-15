import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";

export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();

  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessByCategory();
  }, [param]);

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then(res => {
      setBusinessList(res.data.businessLists);
    })
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          {param?.category}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={businessList}
        renderItem={({item, index}) => (
          <BusinessListItem business={item} />
        )}
      />
    </View>
  );
}
