import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { SocketContext } from '../../contexts/SocketContext';

const CallActions = ({ width, height }) => {
    const { localStream, remoteStream, call, activeCall, socket, peerServer, leaveCall, answerCall, toggleMute } = useContext(SocketContext);

    return (
        <View style={[styles.buttonContainer, { width: width, height: 150, }]}>
            <View style={[styles.actionButtons]}>

                {/* camera toggle or speaker */}
                {
                    activeCall && (activeCall.isVideo ?
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'white', }]}>
                            <Ionicons name='ios-camera-reverse-sharp' size={31} color={'black'} backgroundColor={'grey'} />
                        </TouchableOpacity> :
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'white', }]}>
                            <FontAwesome name='volume-up' size={33} color={'black'} />
                        </TouchableOpacity>)
                }

                {/* video toggle */}
                <TouchableOpacity style={[styles.button, { backgroundColor: 'white', }]}>
                    <Feather name='video-off' size={30} color={'black'} backgroundColor={'grey'} />
                </TouchableOpacity>

                {/* microphone toggle */}
                <TouchableOpacity style={[styles.button, { backgroundColor: 'white', }]}>
                    <MaterialCommunityIcons name='microphone' size={31} color={'black'} backgroundColor={'grey'} />
                    {/* <MaterialCommunityIcons name='microphone-off' size={31} color={'black'} backgroundColor={'grey'} /> */}
                </TouchableOpacity>

                {/* hangup */}
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red', }]} onPress={() => {
                    leaveCall();
                }}>
                    <MaterialIcons name='call-end' size={31} color={'white'} />
                </TouchableOpacity>
            </View>


        </View>
    )
}

//audio
//speaker, video, mute, end
//video
//switch, video, mute, end

export default CallActions

const styles = StyleSheet.create({
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
}
)
