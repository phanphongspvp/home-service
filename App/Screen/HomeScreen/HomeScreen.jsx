import { View, Text } from "react-native";
import Header from "./Header";
import { useUser } from "@clerk/clerk-expo";

export default function HomeScreen() {

    const { user, isLoading } = useUser();

    console.log(user);

    return (
        <View>
            <Header />
            <Text>HomeScreen</Text>
        </View>
    );
}