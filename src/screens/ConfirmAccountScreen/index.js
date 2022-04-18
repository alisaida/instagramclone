import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Button } from 'react-native';
import moment from 'moment'
import logo from '../../assets/images/instagram-logo.png';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from '../../components/Loading';

import { verifyAccount } from '../../api/auth';

const ConfirmAccountScreen = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        console.log(route.params);

        if (route.params.code === '' || route.params.userId === '' || route.params.expiry === '') {
            createSimpleAlert("Something went wrong", "Please try again later");
        }

        //check if link has expired and show alert
        if (route.params.expiry < moment()) {
            createExpiredLinkAlert();
        } else {
            makeVerifyAccountRequest();
        }
    }, []);

    const makeVerifyAccountRequest = async () => {
        setIsLoading(true);
        try {
            const res = await verifyAccount(route.params.userId, route.params.code);
            if (res) {
                console.log('res', res)
                setIsLoading(false);
                if (res.response && res.response.status === 404) {
                    setIsError(true);
                }
            }
        } catch (e) {
            setIsLoading(false);
            console.log(`VerifyAccount Screen: Failed to verify account`, e);
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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => closeScreen()}>
                <Ionicons name='close-outline' size={35} />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />
            {isError ?
                <EvilIcons name='close-o' color={'#ff3d3d'} style={{ marginTop: 5, marginBottom: 15 }} size={100} /> :
                <EvilIcons name='check' color={'#7ac04e'} style={{ marginTop: 5, marginBottom: 15 }} size={100} />}
            <View style={styles.text}>
                {isError ? <Text style={{ textAlign: 'center', marginHorizontal: 25 }}>Unfortunately, there was a problem with verifying your account</Text>
                    : <Text>Thanks for confirming your account details</Text>
                }
            </View>
            <TouchableOpacity style={[styles.closeBtn]} onPress={() => closeScreen()}>
                <Text style={styles.closeBtnText}>Done</Text>
            </TouchableOpacity>
            {isLoading && <Loading isLoading={true} />}
        </View >
    );
}

export default ConfirmAccountScreen;

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
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain'
    },
    text: {
        margin: 15
    },
    closeBtn: {
        width: "80%",
        backgroundColor: "#3f8ee9",
        borderRadius: 3,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 5,
        marginBottom: 20
    },
    closeBtnText: {
        color: 'white',
        fontWeight: '800'
    }
});