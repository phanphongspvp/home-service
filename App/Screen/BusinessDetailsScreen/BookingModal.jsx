import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../Utils/Color";
import Heading from "../../Components/Heading";

export default function BookingModal({ hiddenModal }) {

  const [timeList, setTimeList] = useState(null);

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for(let i = 8;i <= 12;i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ":30 AM"
      })
    }
    for(let i = 1;i <= 7;i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ":30 PM"
      })
    }
    setTimeList(timeList);
  }

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 20
        }}
        onPress={() => hiddenModal()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Đặt trước
        </Text>
      </TouchableOpacity>

      {/* Calender Section */}
      <Heading text={"Chọn ngày"} />
      <View style={styles.calenderContainer}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Color.BLACK}
          todayTextStyle={{ color: Color.WHITE }}
          selectedDayColor={Color.PRIMARY}
          selectedDayTextColor={Color.WHITE}
        />
      </View>

      {/* Time Select Section */}
      <View>
        <FlatList
          data={timeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.selectedTime}>
              <Text style={styles.unSelectedTime}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15
  },
  selectedTime: {

  },
  unSelectedTime: {
    padding: 5,
    borderWidth: 1,
    borderColor: Color.PRIMARY
  }
})