import React, { useContext } from "react";
import Button from "../components/Button";

import { Text, Image, View, Pressable, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { UserContext } from "../../App";

const Introduction = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(UserContext);

    const onContinue = () => {
        setIsLoggedIn(true);
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Let's start your new journey with us..</Text>
                <Text style={[styles.title, styles.innerTitle]}>Welcome to MyApp</Text> 
            </View>      

            <Image resizeMode="contain" style={styles.image} source={require('../assets/splash_image.png')} />  

            <View style={ styles.buttonContainer}>
                <Button onPress={onContinue} title="Continue"></Button>
            </View>
            
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
        marginBottom: 20,
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

export default Introduction;