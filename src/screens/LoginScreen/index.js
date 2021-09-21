import React, { useState, useEffect, useContext } from 'react';
import validator from 'validator';
import axios from 'axios';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Button, KeyboardAvoidingView, Platform } from 'react-native';
import logo from '../../assets/images/instagram-logo.png';

import Loading from '../../components/Loading';

import { login } from '../../redux/actions/authActions';

import { useDispatch, useSelector } from "react-redux";
import { AUTH_CLEAR_ERRORS } from '../../redux/constants/actionTypes';

const LoginScreen = ({ navigation }) => {

    useEffect(() => {
        return () => { }
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(' ');
    const [isLoading, setIsLoading] = useState(false);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        updateState();
    }, [auth]);

    const updateState = () => {
        if (auth) {
            if (auth.error) {
                setErrorMessage(auth.error.toString());
            } else {
                setErrorMessage(' ');
            }
            setIsLoading(auth.isLoading);
            // console.log(auth.userId)
        }
    }

    const validate = async () => {
        if (!email) {
            setErrorMessage('email field is mandatory');
        } else if (!password) {
            setErrorMessage('password field is mandatory');
        } else if (!validator.isEmail(email)) {
            setErrorMessage('please enter valid email');
        } else {
            dispatch(login(email, password));
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.outerContainer}>
            <View style={styles.container}>

                <Image source={logo} style={styles.logo} />
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
                        placeholder="password..."
                        placeholderTextColor="#808080"
                        color='#808080'
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <TouchableOpacity style={[styles.loginBtn]} onPress={() => {
                    validate();
                }}>
                    <Text style={styles.loginText}>log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch({ type: AUTH_CLEAR_ERRORS });
                    navigation.navigate('PassordReset');
                }}>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity onPress={() => {
                    dispatch({ type: AUTH_CLEAR_ERRORS });
                    navigation.navigate('Register');
                }}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
                {isLoading && <Loading isLoading={true} />}
            </View >
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

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
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain'
    },
    errorText: {
        marginTop: -10,
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