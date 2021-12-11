import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

import useInterval from '../../hooks/useInterval';

const interval = 10;

const CallScreen = () => {
    const { localStream, remoteStream, call, socket, peerServer, leaveCall, answerCall } = useContext(SocketContext);
    const [authUserId, setAuthUserId] = useState('');
    const [callerInfo, setCallerInfo] = useState(null);
    const height = Dimensions.get('screen').height;
    const width = Dimensions.get('screen').width;

    const [isRunning, setIsRunning] = useState(true);
    const [prevTime, setPrevTime] = useState(null);
    const [timeInMilliseconds, setTimeInMilliseconds] = useState(0);
    const [time, setTime] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        retrieveUserData();
    }, []);

    useInterval(
        () => {
            let prev = prevTime ? prevTime : Date.now();
            let diffTime = Date.now() - prev;
            let newMilliTime = timeInMilliseconds + diffTime;
            let newTime = toTime(newMilliTime);
            setPrevTime(Date.now());
            setTimeInMilliseconds(newMilliTime);
            setTime(newTime);
        },
        isRunning ? interval : null
    );

    const handleTime = () => {
        setIsRunning(!isRunning);
        setPrevTime(null);
    };

    const toTime = time => {
        let milliseconds = parseInt(time % 1000),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor(time / (1000 * 60));

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return {
            milliseconds,
            seconds,
            minutes
        };
    };

    const retrieveUserData = async () => {
        const authUserId = await SecureStorage.getItem('userId').catch(() => null);
        if (call && call.callId && call.callId.from && call.callId.to) {
            if (authUserId === call.callId.from.userId) {
                setCallerInfo(call.callId.to);
            } else {
                setCallerInfo(call.callId.from);
            }
        } else {
            setCallerInfo(null);
        }
        setAuthUserId(authUserId);
    }


    return (

        call ? (
            call.isVideo && remoteStream ? <RTCView
                streamURL={remoteStream.toURL()}
                style={{ width: width, height: height }}
                objectFit="cover">

                {
                    localStream ? (
                        <RTCView streamURL={localStream.toURL()} style={[styles.localStream, { width: width / 2.8, height: height / 3.6 }]}></RTCView>) : null
                }

                <CallActions width={width} height={150} />
            </RTCView > :
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor="black" barStyle="light-content" />
                    < View style={styles.callerIdContainer}>
                        {callerInfo && <Text style={styles.callInfoFontLarge}>{callerInfo.name}</Text>}
                        {callerInfo && <Text style={styles.callInfoFontSmall}>{callerInfo.username}</Text>}
                        {time && <Text style={[styles.callInfoFontSmall, { marginVertical: 10 }]}>{`${time.minutes}:${time.seconds}`}</Text>}
                    </View>
                    <CallActions width={width} height={150} />
                </SafeAreaView>
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
    callerIdContainer: {
        marginVertical: 25
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#232323',
        marginVertical: 10,
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
