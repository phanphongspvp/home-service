import { View, Text, Image, StyleSheet } from "react-native";
import Color from "../../Utils/Color";

export default function BusinessItemSmall({ business }) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: business?.images[0]?.url }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={{ fontSize: 17, fontFamily: 'outfit-medium' }}>{business?.name}</Text>
                <Text style={{ fontSize: 13, fontFamily: 'outfit' }}>{business?.contactPersion}</Text>
                <Text style={{
                    fontSize: 10,
                    fontFamily: 'outfit',
                    padding: 4,
                    color: Color.PRIMARY,
                    backgroundColor: Color.LIGHT_GRAY,
                    borderRadius: 3,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 7
                }}>{business?.category?.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Color.WHITE,
        borderRadius: 10
    },
    infoContainer: {
        padding: 7,
        display: 'flex',
        gap: 3
    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10
    }
})