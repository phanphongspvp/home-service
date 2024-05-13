import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";

export default function Slider() {

    const [slider, setSlider] = useState([]);

    useEffect(() => {
        getSliders();
    }, []);

    const getSliders = () => {
        GlobalApi.getSlider().then(res => {
            setSlider(res.data.sliders);
        })
    }

    return (
        <View>
            <Heading text={"Ưu đãi dành cho bạn"} />
            <FlatList
                data={slider}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <View style={{ marginRight: 20 }}>
                        <Image
                            source={{ uri: item?.image?.url }}
                            style={styles.sliderImage}
                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: 270,
        height: 150,
        borderRadius: 20,
        objectFit: 'cover'
    }
})