import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import Color from "../../Utils/Color";
import BusinessItemSmall from "./BusinessItemSmall";

export default function BusinessList() {
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        getBusinessList();
    }, []);

    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(res => {
            setBusinessList(res.data.businessLists);
        })
    }

    return (
        <View style={{ marginTop: 20 }}>
            <Heading text={"Kinh doanh mới nhất"} isViewAll={true} />
            <FlatList
                data={businessList}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <View style={{ marginRight: 10 }}>
                        <BusinessItemSmall business={item} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})