import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Button, KeyboardAvoidingView, Platform } from 'react-native';

import validator from 'validator';

import { useDispatch, useSelector } from "react-redux";
import logo from '../../assets/images/instagram-logo.png';

import { register, logout } from '../../redux/actions/authActions'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import { AUTH_CLEAR_ERRORS } from '../../redux/constants/actionTypes';

const RegisterScreen = ({ navigation }) => {

    // useEffect(() => {
    //     return () => { }
    // })

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(' ');
    const [isLoading, setIsLoading] = useState(false);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        updateState();
    }, [auth]);

    const updateState = async () => {
        if (auth) {
            if (auth.error) {
                setErrorMessage(auth.error.toString());
            } else {
                setErrorMessage(' ');
                const accessToken = await auth.accessToken;
                if (accessToken) {
                    console.log(accessToken);
                    navigation.pop();
                    dispatch(logout());
                    createVerifyAccountAlert();
                }
            }
            setIsLoading(auth.isLoading);
        }
    }

    const closeScreen = () => {
        // navigation.pop();
    }

    const createVerifyAccountAlert = () =>
        Alert.alert(
            "Verify account",
            "Please check you email to verify account",
            [
                {
                    text: "Close",
                    onPress: () => closeScreen(),
                    style: "cancel"
                }
            ]
        );

    const validate = async () => {
        if (!email) {
            setErrorMessage('email field is mandatory');
        } else if (!name) {
            setErrorMessage('name field is mandatory');
        } else if (!username) {
            setErrorMessage('username field is mandatory');
        } else if (!password) {
            setErrorMessage('password field is mandatory');
        } else if (!validator.isEmail(email)) {
            setErrorMessage('please enter valid email');
        } else {
            dispatch(register(email, name, username, password));
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.outerContainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeIcon} onPress={() => {
                    dispatch({ type: AUTH_CLEAR_ERRORS });
                    navigation.pop();
                }}>
                    <Ionicons name='close-outline' size={35} />
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerText}>Sign up to see posts from your friends.</Text>
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
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="name..."
                        placeholderTextColor="#808080"
                        color='#808080'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="username..."
                        placeholderTextColor="#808080"
                        color='#808080'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={text => setUsername(text)}
                    />
                </View>
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
                <TouchableOpacity style={[styles.loginBtn]} onPress={() => validate()}>
                    <Text style={styles.loginText}>sign up</Text>
                </TouchableOpacity>
                {isLoading && <Loading isLoading={true} />}
            </View >
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;

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
    }, headerText: {
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