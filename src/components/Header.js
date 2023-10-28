import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { UserContext, deleteToken } from "../../App";

const Header = () => {
    const { setIsLoggedIn } = useContext(UserContext);

    const Logout = () => {
        deleteToken()
        .then(() => setIsLoggedIn(false))
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={Logout}>
                <Text style={styles.title}>Logout</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
        margin: 20,
        marginBottom: 54
    },
    image: {
        width: 18,
        height: 18,
        tintColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "500",
    }
})

export default Header;