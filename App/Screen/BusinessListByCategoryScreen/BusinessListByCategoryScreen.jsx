import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import Color from "../../Utils/Color";
import PageHeading from "../../Components/PageHeading";

export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();

  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessByCategory();
  }, [param]);

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((res) => {
      setBusinessList(res.data.businessLists);
    });
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={param?.category} />
      {businessList.length > 0 ? (
        <FlatList
          data={businessList}
          style={{ marginTop: 15 }}
          renderItem={({ item, index }) => <BusinessListItem business={item} />}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            textAlign: "center",
            marginTop: "10%",
            color: Color.GRAY,
          }}
        >
          Hiện tại không có dịch vụ
        </Text>
      )}
    </View>
  );
}
