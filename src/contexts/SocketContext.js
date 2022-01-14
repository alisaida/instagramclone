import React, { createContext, useState, useRef, useEffect } from 'react';
import SecureStorage from 'react-native-secure-storage';
import { io } from 'socket.io-client';
import Peer from 'react-native-peerjs';
import { mediaDevices } from 'react-native-webrtc';
import PushNotification from 'react-native-push-notification';

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [call, setCall] = useState(null);
    const [authUser, setAuthUser] = useState('');
    const [socket, setSocket] = useState(null);
    const [peerServer, setPeerServer] = useState(null);
    const [connection, setConnection] = useState(null);
    const [isMute, setIsMute] = useState(false);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        if (!socket) {
            initWebSocket();
        }

        initLocalStream();
    }, []);

    const initLocalStream = () => {
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
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

        const socket = io(`http://192.168.0.56:5053?userId=${userId}`, {
            reconnection: true,
            autoConnect: true,
        });

        socket.on('connect', () => {
            console.log('Successfully connect to call service')
            setSocket(socket);
        });

        socket.on('user-offline', (data) => {
            console.log('userOffline');
            // resetContext();
            closeCall();
        });

        const peerServer = new Peer(userId, {
            host: '192.168.0.56',
            secure: false, //requires ssl certificates
            port: 5053,
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
                setConnection(connection);
                setCall(callData);

                // peerjs close event after disconnecting
                connection.on('close', () => {
                    // resetContext();
                    closeCall();
                });
            });

            // end call event after sending call
            socket.on('call-ended', (data) => {
                closeCall();
            });
        });

        socket.on('send-message', (messageData) => {
            handleNotification(messageData);
        });


    }

    const handleNotification = (messageData) => {
        const { from, to, message } = messageData;
        const { content, chatRoomId } = message;
        const { name, username } = from;

        PushNotification.localNotification({
            channelId: 'chats',
            // title: from.name,
            subtitle: from.name,
            message: message.content,
            sound: "chime.aiff",
            playSound: true,
            userInfo: {
                chatRoomId: message.chatRoomId,
                recipientProfile: from,
                authUser: to.userId
            },
        });
    }

    const sendTxtMessage = (messageData) => {
        if (!socket) {
            return;
        }

        socket.emit('send-message', messageData);
    };

    const toggleCamera = () => {
        if (localStream) {
            // @ts-ignore
            localStream.getVideoTracks().forEach((track) => track._switchCamera());
        }
    };

    const toggleMicrophone = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
                setIsMute(!track.enabled);
            });
        }
    };

    const disableCamera = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
        }
    };

    const answerCall = () => {
        if (!socket) {
            console.log('Socket connection error');
            return;
        }

        if (call && !call.isVideo) {
            disableCamera();
        }

        setCall({ ...call, isAccepted: true });

        //end call event after accepting call
        socket.on('call-ended', (data) => {
            closeCall();
        });

        socket.on('call-connected', (data) => {
            setCall(data)
        });

        socket.emit('accept-call', call);
        connection.answer(localStream);
        connection.on('stream', (stream) => {
            setRemoteStream(stream)
        });
    };

    // const handleNotification = (message, from) => {

    // };

    const callUser = (callData) => {
        if (!peerServer || !socket) {
            console.log('Peer server or socket connection error');
            return;
        }

        if (callData && !callData.isVideo) {
            disableCamera();
        }

        socket.emit('call-user', callData);
        setCall(callData);

        //end call event after accepting call
        socket.on('call-ended', (data) => {
            closeCall();
        });

        try {
            const conn = peerServer.call(callData.callId.to.userId, localStream);
            conn.on('stream', (stream) => {
                console.log('New call received from', callData.callId.from.username, callData);
                setCall({ ...callData, isAccepted: true });
                setRemoteStream(stream)
            });
            conn.on('close', () => {
                resetContext();
            });
        } catch (error) {
            console.log('Calling error', error);
            console.log(`SocketContext: Failed initiate Call: ${callData}`, error);
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
        if (!socket) {
            console.log('Socket connection error');
            return;
        }

        const recipient = getRecipientUserId();
        if (recipient) {
            console.log(recipient)
            socket.emit('end-call', { ...call, endedBy: authUser, recipient: recipient });
        }

        if (!call.isAccepted) {
            closeCall(); //close any active calls
        }
    };

    const closeCall = () => {
        if (connection) {
            connection.close();
        }

        resetContext();
    }

    const resetContext = () => {
        setCall({ ...call, isAccepted: false });
        setCall(null);
        setRemoteStream(null);
    }

    return (
        <SocketContext.Provider value={{ localStream, remoteStream, call, authUser, socket, peerServer, callUser, sendTxtMessage, leaveCall, answerCall, isMute, toggleMicrophone, toggleCamera }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };