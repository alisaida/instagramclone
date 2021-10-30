import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SocketContext } from '../../contexts/SocketContext';
import SecureStorage from 'react-native-secure-storage';

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
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, leaveCall, answerCall } = useContext(SocketContext);
    const [callerInfo, setCallerInfo] = useState(null);
    const [isReceivingCall, setIsReceivingCall] = useState(false);
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
        const authUserId = await SecureStorage.getItem('userId').catch(() => null);
        if (authUserId === call.callId.from.userId) {
            setIsReceivingCall(false);
            setCallerInfo(call.callId.to);
        } else {
            setIsReceivingCall(true);
            setCallerInfo(call.callId.from);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            {!isReceivingCall && <View style={styles.callStatus}>
                <Text style={styles.callInfoFontSmall}>ringing ...</Text>
            </View>}
            <View style={styles.callerIdContainer}>
                {callerInfo && <Text style={styles.callInfoFontLarge}>{callerInfo.name}</Text>}
                {callerInfo && <Text style={styles.callInfoFontSmall}>{callerInfo.username}</Text>}
            </View>
            <View style={styles.actionButtons}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.declineCall} onPress={() => {
                        // navigation.pop();
                        leaveCall();
                    }}>
                        <MaterialIcons name='call-end' size={40} color={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Decline</Text>
                </View>
                {isReceivingCall && <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.acceptCall} onPress={() => {
                        answerCall()
                    }}>
                        <MaterialIcons name='call' size={40} color={'white'} />
                    </TouchableOpacity>

                    <Text style={styles.buttonLabel}>Accept</Text>
                </View>}
            </View>
        </SafeAreaView>
    )
}

export default CallScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    callStatus: {
        marginTop: 20,
    },
    callerIdContainer: {
        marginVertical: 25
    },
    callInfoFontLarge: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
    },
    callInfoFontSmall: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        position: 'absolute',
        marginBottom: 30,
        bottom: 0,
        alignSelf: 'center',
    },
    declineCall: {
        backgroundColor: 'red',
        borderRadius: 50,
        margin: 20,
        padding: 10,
    },
    acceptCall: {
        backgroundColor: 'green',
        borderRadius: 50,
        margin: 20,
        padding: 10,
    },
    buttonLabel: {
        color: 'white',
        alignSelf: 'center',
    },
    buttonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 5,
    }
})
