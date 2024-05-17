import { View, Text, Image, FlatList } from "react-native";
import Heading from "../../Components/Heading";
import { useUser } from "@clerk/clerk-expo";
import Color from "../../Utils/Color";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen() {
  const { user } = useUser();

  const profileMenu = [
    {
      id: 1,
      name: "Trang chủ",
      icon: "home",
    },
    {
      id: 2,
      name: "Đặt trước",
      icon: "bookmark-sharp",
    },
    {
      id: 3,
      name: "Email",
      icon: "mail",
    },
    {
      id: 4,
      name: "Đăng xuất",
      icon: "log-out",
    },
  ];

  return (
    <View>
      <View
        style={{ padding: 20, paddingTop: 30, backgroundColor: Color.PRIMARY }}
      >
        <Heading text={"Trang cá nhân"} color={Color.WHITE} />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 100 }}
          />
          <Text
            style={{
              fontSize: 24,
              marginTop: 8,
              fontFamily: "outfit-medium",
              color: Color.WHITE,
            }}
          >
            {user.fullName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontFamily: "outfit-medium",
              color: Color.WHITE,
            }}
          >
            {user.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 60 }}>
          <FlatList
            data={profileMenu}
            renderItem={({ item, index }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 40,
                  paddingHorizontal: 90
                }}
              >
                <Ionicons name={item.icon} size={40} color={Color.PRIMARY} />
                <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
      </View>
    </View>
  );
}
