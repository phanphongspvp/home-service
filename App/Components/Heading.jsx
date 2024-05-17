import { Text, View, StyleSheet } from "react-native";

export default function Heading({text, isViewAll=false, color}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.heading, { color }]}>{text}</Text>
            {isViewAll && (<Text>Xem tất cả</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    }
});