import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Heading from "../../Components/Heading";
import Color from "../../Utils/Color";

export default function BusinessAboutMe({ business }) {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Heading text={"Thông tin"} />
      <Text
        style={{
          fontFamily: "outfit",
          color: Color.GRAY,
          fontSize: 16,
          lineHeight: 28,
        }}
        numberOfLines={isReadMore ? 20 : 5}
      >
        {business?.about}
      </Text>
      <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
        <Text
          style={{
            color: Color.PRIMARY,
            fontSize: 16,
            fontFamily: "outfit",
          }}
        >
          {isReadMore ? "Thu ngắn" : "Đọc thêm"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
