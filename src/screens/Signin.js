import React, { useContext, useState } from "react";
import AuthHeader from "../components/AuthHeader";

import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors";
import { UserContext, storeToken } from "../../App";

const Signin = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSignUp = () => {
        navigation.navigate("Signup");
    };

    const onBack = () => {
        navigation.goBack();
    }

    const onPressSignIn = async () => {
        //validate email and password using post call and then store the token
        if(password && email){
            await storeToken('iamtoken');
            setIsLoggedIn(true);
        } else{
            Alert.alert('All fields are required');
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign In"/>
                <Input label="Email" placeholder="example@gmail.com"  value={email} onChangeText={setEmail}/>
                <Input isPassword  label="Password" placeholder="********" value={password} onChangeText={setPassword}/>

                <Button style={styles.button} title="Sign In" onPress={onPressSignIn}/>

                <Text style={styles.footerText}>
                    Don't have an account? 
                    <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
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

export default Signin;