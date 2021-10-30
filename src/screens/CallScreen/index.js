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
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, leaveCall } = useContext(SocketContext);
    const [authUserId, setAuthUserId] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const height = Dimensions.get('screen').height;
    const width = Dimensions.get('screen').width;

    console.log(stream)
    useEffect(() => {
        retrieveUserData();
    }, []);

    const retrieveUserData = async () => {
        const userId = await SecureStorage.getItem('userId').catch(() => null);
        setAuthUserId(userId);
        // console.log(userId);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View>

                <View
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#fff',
                        width: width, height: height
                    }}>
                </View>

                {
                    stream ? (
                        <RTCView
                            streamURL={stream.toURL()}
                            style={styles.myStream}
                        />) : null
                }
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.callButton} onPress={() => {
                    // navigation.pop();
                    leaveCall();
                }}>
                    <MaterialIcons name='call-end' size={40} color={'white'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.micButton}>
                    <MaterialIcons name='mic-off' size={40} color={'black'} />
                </TouchableOpacity>
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
    myStream: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 120,
        height: 180,
        margin: 10
    },
    actionButtons: {
        flexDirection: 'row',
        position: 'absolute',
        marginBottom: 30,
        bottom: 0,
        alignSelf: 'center',
    },
    callButton: {
        backgroundColor: 'red',
        borderRadius: 50,
        margin: 20,
        padding: 5,
    },
    micButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        margin: 20,
        padding: 5,
    }
})
