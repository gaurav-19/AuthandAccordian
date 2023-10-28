import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

const Input = ({ label, type, options, isPassword, value, onChangeText, placeholder, style, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSelect = (opt) => {
        onChangeText(opt);
        setPickerModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={isPassword && !isPasswordVisible} style={[styles.input, style]} {...props} />

                    {isPassword ? (
                        <Pressable onPress={onEyePress}>
                            <Image style={styles.eye} source={isPasswordVisible ? require('../assets/eye.png') : require('../assets/eye_closed.png')} />
                        </Pressable>
                    ) : null}
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        color: colors.blue,
        fontSize: 14,
        fontWeight: '500'
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: colors.black,
        paddingHorizontal: 16,
        paddingVertical: 20,
        flex: 1,
    },
    eye: {
        marginHorizontal: 16,
    },
    arrow: {
        marginHorizontal: 16,
        transform: [{ rotate: '90deg' }]
    },
    placeholder: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        flex: 1,
        color: colors.lightGrey,
    },
});

export default React.memo(Input);