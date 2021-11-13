import React, { createContext, useState, useRef, useEffect } from 'react';
import SecureStorage from 'react-native-secure-storage';
import { io } from 'socket.io-client';
import Peer from 'react-native-peerjs';
import {
    mediaDevices
} from 'react-native-webrtc';

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [call, setCall] = useState(null);
    const [activeCall, setActiveCall] = useState(null);
    const [authUser, setAuthUser] = useState('');
    const [socket, setSocket] = useState(null);
    const [peerServer, setPeerServer] = useState(null);
    const [connection, setConnection] = useState(null);

    useEffect(() => {

        if (!socket) {
            initWebSocket();
        }

        initLocalStream();
    }, []);

    const initLocalStream = () => {
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            // console.log(sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 640,
                    height: 480,
                    frameRate: 30,
                    facingMode: (isFront ? "user" : "environment"),
                    deviceId: videoSourceId
                }
            }).then((currentStream) => {
                setLocalStream(currentStream);
            }).catch(error => {
                console.log(error);
            })
        });
    }

    const initWebSocket = async () => {
        const userId = await SecureStorage.getItem('userId').catch(() => null);
        setAuthUser(userId);
        // console.log(`${userId} available for calls`);

        const socket = io(`http://192.168.0.4:5000?userId=${userId}`, {
            reconnection: true,
            autoConnect: true,
        });

        socket.on('connect', () => {
            console.log('Successfully connect to call service')
            setSocket(socket);
        });

        socket.on('user-offline', (data) => {
            console.log('userOffline');
            setActiveCall(null);
            setCall(null);
        });

        socket.on('rejected-call', (data) => {
            console.log('rejecing call');
            setActiveCall(null);
            setCall(null);
        });

        const peerServer = new Peer(userId, {
            host: '192.168.0.4',
            secure: false, //requires ssl certificates
            port: 5000,
            path: '/peerjs'
        });

        peerServer.on('error', (error) => {
            console.log('Peer server connection error', error);
        });

        peerServer.on('open', (peerId) => {
            console.log('Peer Server connection successful');
            setPeerServer(peerServer);
        });

        socket.on('call-user', (callData) => {
            console.log('initializing calll', callData);
            peerServer.on('call', (connection) => {
                // console.log('peer server receiving call', data);
                setConnection(connection);
                setCall({ ...callData, isRinging: true });
            });
        });



    }

    const answerCall = () => {
        if (!socket) {
            console.log('Socket connection error');
            return;
        }

        socket.on('call-ended', (data) => {
            console.log('ended all calls line', 111);
            setActiveCall(null);
            setCall(null);
        });

        socket.emit('accept-call', call);
        connection.answer(localStream);
        connection.on('stream', (stream) => {
            // setActiveCall(callData);
            setRemoteStream(stream)
        });
        setActiveCall(call);
    };

    const callUser = (callData) => {

        if (!peerServer || !socket) {
            console.log('Peer server or socket connection error');
            return;
        }

        socket.emit('call-user', callData);
        setCall(callData);

        socket.on('call-ended', (data) => {
            console.log('ended all calls line', 144);
            setActiveCall(null);
            setCall(null);
        });

        try {
            const conn = peerServer.call(callData.callId.to.userId, localStream);
            conn.on('stream', (stream) => {
                setActiveCall(callData);
                setRemoteStream(stream)
            });
        } catch (error) {
            console.log('Calling error', error);
        }
    };

    const getRecipientUserId = () => {
        if (!call) {
            return null;
        }

        if (authUser === call.callId.from.userId) {
            return call.callId.to.userId;
        } else {
            return call.callId.from.userId;
        }
    }

    const leaveCall = () => {
        console.log('ended all calls line', 175);

        if (!socket) {
            console.log('Socket connection error');
            return;
        }

        console.log('here')
        //end call for reciepient

        const recipient = getRecipientUserId();
        if (recipient) {
            socket.emit('end-call', { ...call, endedBy: authUser, recipient: recipient });
        }

        setActiveCall(null);
        setCall(null)
    };

    return (
        <SocketContext.Provider value={{ localStream, remoteStream, call, activeCall, authUser, socket, peerServer, callUser, leaveCall, answerCall }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };