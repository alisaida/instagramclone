import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';

import { useDispatch, useSelector } from "react-redux";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation, useRoute } from '@react-navigation/native';

import { SocketContext } from '../../contexts/SocketContext';

import SecureStorage from 'react-native-secure-storage';

import CallActions from '../../components/CallActions';

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals,
    RTCView
} from 'react-native-webrtc';

const CallScreen = () => {
    const { localStream, remoteStream, call, socket, peerServer, leaveCall, answerCall } = useContext(SocketContext);
    const [authUserId, setAuthUserId] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const height = Dimensions.get('screen').height;
    const width = Dimensions.get('screen').width;

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        retrieveUserData();
    }, []);

    const retrieveUserData = async () => {
        const userId = await SecureStorage.getItem('userId').catch(() => null);
        setAuthUserId(userId);
    }


    return (

        remoteStream ? (
            <RTCView
                streamURL={remoteStream.toURL()}
                style={{ width: width, height: height }}
                objectFit="cover">

                {
                    localStream ? (
                        <RTCView streamURL={localStream.toURL()} style={[styles.localStream, { width: width / 2.8, height: height / 3.6 }]}></RTCView>) : null
                }


                <CallActions width={width} height={150} />
            </RTCView >


        ) : null

    )
}

export default CallScreen

const styles = StyleSheet.create({
    localStream: {
        position: 'absolute',
        top: 30,
        right: 15,
        margin: 5,
    },
    remoteStream: {

    },
    buttonContainer: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#232323',
        marginVertical: 10,
    },
    actionButtons: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#232323',

    },
    button: {
        borderRadius: 50,
        margin: 20,
        padding: 6,
    }
})
