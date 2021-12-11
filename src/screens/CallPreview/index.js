import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const PreviewScreen = () => {
    const { localStream, remoteStream, call, socket, peerServer, leaveCall, answerCall } = useContext(SocketContext);
    const [callerInfo, setCallerInfo] = useState(null);
    const [isReceivingCall, setIsReceivingCall] = useState(false);

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
        if (call && call.callId && call.callId.from && call.callId.to) {
            if (authUserId === call.callId.from.userId) {
                setIsReceivingCall(false);
                setCallerInfo(call.callId.to);
            } else {
                setIsReceivingCall(true);
                setCallerInfo(call.callId.from);
            }
        } else {
            setCallerInfo(null);
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
                        <MaterialIcons name='clear' size={40} color={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.buttonLabel}>Decline</Text>
                </View>
                {isReceivingCall && <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.acceptCall} onPress={() => {
                        answerCall()
                    }}>
                        <MaterialIcons name='check' size={40} color={'white'} />
                    </TouchableOpacity>

                    <Text style={styles.buttonLabel}>Accept</Text>
                </View>}
            </View>
        </SafeAreaView>
    )
}

export default PreviewScreen

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
        backgroundColor: '#397df2',
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
