import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../../Utils/Color";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../../assets/images/login.png")}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 20, color: Color.WHITE, textAlign: "center" }}>
          Hãy tìm
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            Dịch vụ vệ sinh và sửa chữa{" "}
          </Text>
          chuyên nghiệp
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: Color.WHITE,
            textAlign: "center",
            marginTop: 6,
          }}
        >
          Ứng dụng tốt nhất để tìm các dịch vụ gần bạn mang đến cho bạn dịch vụ
          chuyên nghiệp
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Color.PRIMARY }}
          >
            Bắt đầu nào
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Color.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Color.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 90,
    marginTop: 40,
    backgroundColor: Color.WHITE,
  },
});
