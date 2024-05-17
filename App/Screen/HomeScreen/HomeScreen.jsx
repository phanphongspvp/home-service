import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";
import BusinessList from "./BusinessList";

export default function HomeScreen() {
  const sections = [
    { key: "slider", render: () => <Slider /> },
    { key: "categories", render: () => <Categories /> },
    { key: "businessList", render: () => <BusinessList /> },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <View style={styles.section}>{item.render()}</View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    paddingVertical: 10,
  },
});
