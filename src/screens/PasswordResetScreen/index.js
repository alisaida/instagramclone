import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Button } from 'react-native';
import logo from '../../assets/images/instagram-logo.png';

import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordResetScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(' ');

    const validate = async () => {
        if (!email) {
            setErrorMessage('enter email');
        } else if (!validator.isEmail(email)) {
            setErrorMessage('please enter valid email');
        } else {
            //const response = await login(email, password);

            // if (response && response.status === 200) {
            //     //updateIsLoggedIn(true);
            //     setErrorMessage('');
            // } else {
            //     setErrorMessage(response.message);
            // }
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.pop()}>
                <Ionicons name='close-outline' size={35} />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.headerText}>Trouble with logging in?</Text>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="email..."
                    placeholderTextColor="#808080"
                    color='#808080'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <TouchableOpacity style={[styles.loginBtn]} onPress={validate}>
                <Text style={styles.loginText}>Send Login Link</Text>
            </TouchableOpacity>
        </View >
    );
}

export default PasswordResetScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        position: 'absolute',
        right: 30,
        top: 50
    },
    headerText: {
        fontSize: 18,
        marginTop: -15,
        marginBottom: 10,
        fontWeight: '400'
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain'
    },
    errorText: {
        marginBottom: 10,
        color: "red"
    },
    inputView: {
        width: "80%",
        borderRadius: 3,
        borderColor: "#808080",
        borderWidth: 1,
        height: 35,
        marginBottom: 10,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 35,
        color: "black"
    },
    link: {
        color: "#006aff",
        fontSize: 13,
        marginVertical: 5
    },
    loginBtn: {
        width: "80%",
        backgroundColor: 'rgba(0, 149, 246, .3)',
        borderRadius: 3,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 5,
        marginBottom: 20
    },
    loginText: {
        color: 'white',
        fontWeight: '800'
    }
});