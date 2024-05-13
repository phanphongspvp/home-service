import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import Color from "../../Utils/Color";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        GlobalApi.getCategory().then(res => {
            setCategories(res.data.categories);
        })
    }

    return (
        <View style={{ marginTop: 10 }}>
            <Heading text={"Danh mục"} isViewAll={true} />
            <FlatList
                data={categories}
                numColumns={4}
                renderItem={({item, index}) => index<=3 && (
                    <View style={styles.container}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={{ uri: item?.icon?.url }}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <Text style={{ fontFamily: 'outfit-medium', marginTop: 5 }}>{item?.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: Color.LIGHT_GRAY,
        padding: 17,
        borderRadius: 100
    }
})