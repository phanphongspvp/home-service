import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../Utils/Color";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import moment from "moment";

export default function BookingModal({ businessId, hiddenModal }) {
  const [timeList, setTimeList] = useState(null);
  const [isCreated, setIsCreated] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [note, setNote] = useState("");
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  // Create Booking Method
  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Vui lòng chọn ngày và thời gian", ToastAndroid.LONG);
      return;
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      time: selectedTime,
      date: moment(selectedDate).format("DD-MM-yyyy"),
      note: note,
      businessId: businessId,
    };

    GlobalApi.getUserBooking(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        const bookings = res.data.bookings;
        if (bookings.length > 0) {
          for (let i = 0; i < bookings.length; i++) {
            if (bookings[i]?.businessList?.id === businessId) {
              setIsCreated(false);
              ToastAndroid.show(
                "Bạn đã đặt lịch cho dịch vụ này rồi",
                ToastAndroid.LONG
              );
              return;
            }
          }
        }
        if (isCreated) {
          GlobalApi.createBooking(data).then(res => {
            if(res?.data?.createBooking?.id) {
              ToastAndroid.show("Đặt lịch thành công!", ToastAndroid.LONG);
              hiddenModal();
            }
            return;
          })
        }
      }
    );
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
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
            onDateChange={(date) => setSelectedDate(date)}
            width={340}
            minDate={Date.now()}
            todayBackgroundColor={Color.BLACK}
            todayTextStyle={{ color: Color.WHITE }}
            selectedDayColor={Color.PRIMARY}
            selectedDayTextColor={Color.WHITE}
          />
        </View>

        {/* Time Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Chọn thời gian"} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Ghi chú của bạn"} />
          <TextInput
            placeholder="Ghi chú"
            style={styles.noteTextArea}
            numberOfLines={4}
            multiline={true}
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>

        {/* Confirmation Button */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.confirmBtn}>Xác nhận và đặt lịch</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 100,
    paddingHorizontal: 18,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 100,
    paddingHorizontal: 18,
    color: Color.PRIMARY,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Color.PRIMARY,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 17,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    padding: 13,
    borderRadius: 100,
    elevation: 2,
  },
});
