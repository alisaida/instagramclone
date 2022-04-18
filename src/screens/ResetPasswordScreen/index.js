import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Button, KeyboardAvoidingView, Platform } from 'react-native';
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';

import { forgotPasswordWithUserId, resetPassword } from '../../api/auth';
import logo from '../../assets/images/instagram-logo.png';

const ResetPasswordScreen = ({ navigation, route }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(' ');
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (route.params.code === '' || route.params.userId === '' || route.params.expiry === '') {
            createSimpleAlert("Something went wrong", "Please try again later");
        }

        //check if link has expired and show alert
        if (route.params.expiry < moment()) {
            createExpiredLinkAlert();
        }
    }, []);

    const makeForgotPasswordRequest = async () => {
        try {
            await forgotPasswordWithUserId(route.params.userId);
        } catch (e) {
            console.log(`ResetPassword Screen: Failed to send passowrd reset link to email`, e);
        }
    }

    const makeResetPasswordRequest = async () => {
        setIsLoading(true);
        try {
            const res = await resetPassword(route.params.userId, password, route.params.code);
            if (res) {
                console.log('res', res)
                setIsLoading(false);
                if (res.response && res.response.status === 401)
                    createSimpleAlert("Something went wrong", "Please try again later")
                else
                    createSimpleAlert("Success!", "Password successfully changed");
            }
        } catch (e) {
            setIsLoading(false);
            console.log(`ResetPassword Screen: Failed to reset passowrd`, e);
        }
    }

    const closeScreen = () => {
        navigation.navigate("Login");
    }

    const createExpiredLinkAlert = () =>
        Alert.alert(
            "The link has expired",
            "Send another link to your email?",
            [
                {
                    text: "Close",
                    onPress: () => closeScreen(),
                    style: "cancel"
                },
                {
                    text: "Resend", onPress: () => {
                        makeForgotPasswordRequest();
                        closeScreen();
                    }
                }
            ]
        );

    const createSimpleAlert = (alertTitle, alertMessage) =>
        Alert.alert(
            alertTitle,
            alertMessage,
            [
                {
                    text: "OK",
                    onPress: () => closeScreen(),
                    style: "cancel"
                }
            ]
        );

    const validate = async () => {
        if (!password) {
            setErrorMessage('enter password');
        } else if (!confirmPassword) {
            setErrorMessage('enter password confirmation');
        }
        else if (password !== confirmPassword) {
            setErrorMessage('passwords do not match');
        } else {
            makeResetPasswordRequest();
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.outerContainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeIcon} onPress={() => closeScreen()}>
                    <Ionicons name='close-outline' size={35} />
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerText}>Reset password</Text>
                {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="password..."
                        placeholderTextColor="#808080"
                        color='#808080'
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="confirm password..."
                        placeholderTextColor="#808080"
                        color='#808080'
                        secureTextEntry={true}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                </View>
                <TouchableOpacity style={[styles.loginBtn]} onPress={validate}>
                    <Text style={styles.loginText}>Reset Password</Text>
                </TouchableOpacity>
                {isLoading && <Loading isLoading={true} />}
            </View >
        </KeyboardAvoidingView >
    );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
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

//`instagramclone://reset-password?callbackUri=http://localhost:${PORT}/api/auth/forgot-password&userId=${userId}&code=${code}`