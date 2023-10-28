import React, { useState } from "react";
import AuthHeader from "../components/AuthHeader";

import { Alert, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors";
import { storeToken } from "../../App";

const Signup = ({ navigation }) => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSignIn = () => {
        navigation.navigate("Signin");
    };

    const onBack = () => {
        navigation.goBack();
    }

    const onPressSignUp = async () => {
        //post api call for name, email and password using post call and then store the token
        if(name && password && email){
            navigation.navigate("Introduction");
            await storeToken('iamtoken');
        } else{
            Alert.alert('All fields are required');
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <AuthHeader onBackPress={ onBack }title="Sign Up"/>
                <Input label="Name" placeholder="John Doe" value={name} onChangeText={setName}/>
                <Input label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail}/>
                <Input isPassword  label="Password" placeholder="********" value={password} onChangeText={setPassword}/>

                <Button style={styles.button} title="Sign Up" onPress={onPressSignUp}/>

                <Text style={styles.footerText}>
                    Already have an account? 
                    <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
                </Text>
                
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    agreeRow:{
        flexDirection: "row",
        alignItems: "center",

    },
    agreeText:{
        color: colors.blue,
        marginHorizontal: 13
    },
    agreeTextBold:{
        fontWeight: "bold"
    },
    button:{
        marginVertical: 20
    },
    footerText:{
        color: colors.blue,
        marginVertical: 56,
        textAlign: "center"
    },
    footerLink:{
        fontWeight: "bold"
    }
})

export default Signup;