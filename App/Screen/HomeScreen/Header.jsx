import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Color from "../../Utils/Color";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header() {

    const { user, isLoading } = useUser();

    return user && (
        <View style={styles.container}>
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: user?.imageUrl }}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={{ color: Color.WHITE }}>Xin chào,</Text>
                        <Text style={{ color: Color.WHITE, fontSize: 18, fontFamily: 'outfit-medium' }}>{user?.fullName}</Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={27} color="white" />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Tìm kiếm..."
                />
                <FontAwesome style={styles.searchBtn} name="search" size={24} color={Color.PRIMARY} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Color.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 100
    },
    searchContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Color.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        fontFamily: 'outfit'
    },
    searchBtn: {
        backgroundColor: Color.WHITE,
        padding: 10,
        borderRadius: 8
    }
})