import React from "react";
import Button from "../components/Button";

import { Text, Image, View, Pressable, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

const Splash = ({ navigation }) => {
    const onSignup = () => {
        navigation.navigate("Signup");
    }
    const onSignin = () => {
        navigation.navigate("Signin");
    }

    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.image} source={require('../assets/splash_image.png')} />      

            <View style={ styles.buttonContainer}>
                <Button onPress={onSignup} title="Sign Up"></Button>
            </View>
            
            <Pressable onPress={onSignin} hitSlop={20}>
                <Text style={styles.footerText}>Sign In</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 30
    },
    titleContainer: {
        marginVertical: 54,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    innerTitle: {
        color: colors.orange,
        textDecorationLine: 'underline',
    },
    footerText: {
        color: colors.blue,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
    },
    buttonContainer:{ 
        width:"100%", 
        flexDirection:"row"
    }
});

export default Splash;