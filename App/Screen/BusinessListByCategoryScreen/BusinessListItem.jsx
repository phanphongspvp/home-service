import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Color from "../../Utils/Color";

export default function BusinessListItem({ business }) {
  return (
    <View style={styles.container}>
        <Image
            source={{ uri: business?.images[0]?.url }}
            style={styles.image}
        />
        <View>
            <Text style={{ fontFamily: 'outfit', color: Color.GRAY, fontSize: 15 }}>{business.contactPersion}</Text>
            <Text>{business.name}</Text>
            <Text>{business.address}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Color.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15
    }
})