import React, { createContext, useState, useRef, useEffect } from 'react';
import SecureStorage from 'react-native-secure-storage';
import { io } from 'socket.io-client';
import Peer from 'react-native-peerjs';
import {
    mediaDevices
} from 'react-native-webrtc';

const SocketContext = createContext();

// let socket;

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState(null);
    const [me, setMe] = useState('');
    const [socket, setSocket] = useState(null);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {

        if (!socket) {
            initWebSocket();
        }

        initCall();
    }, []);

    const receiveCall = (data) => {
        setCall({ ...data, isReceivingCall: true });
    }

    const initWebSocket = async () => {
        const userId = await SecureStorage.getItem('userId').catch(() => null);
        // console.log(`${userId} available for calls`);

        const socket = io(`http://192.168.0.4:5000?userId=${userId}`);
        setSocket(socket);

        setMe(userId);

        socket.on('callUser', (data) => {
            receiveCall(data);
        });

        //----------------------------------------->>>>>>>>>>>>>>>>>>>>>> BUG offline mode does not work properly
        socket.on('userOffline', (data) => {
            console.log('userOffline')
        });

    }

    const initCall = () => {
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
                setStream(currentStream);


                // myVideo.current.srcObject = currentStream;
            }).catch(error => {
                console.log(error);
            })
        });
    }

    const answerCall = () => {
        setCallAccepted(true);

        // console.log(call)

        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('open', (data) => {
            console.log('accepting call')
            // console.log(data);
            socket.emit('answerCall', { ...call, signalData: data });
        });
        peer.on('data', (currentStream) => {
            console.log(`line 102`);
            console.log(currentStream);
            userVideo.current.srcObject = currentStream;
        });

        peer.call(call.signalData);
        connectionRef.current = peer;
    };

    const callUser = (callData) => {
        console.log('calling user');

        // console.log({ ...callData })
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('open', (data) => {
            socket.emit('callUser', { ...callData, signalData: data });
        });
        peer.on('stream', (currentStream) => {
            console.log('wtf2')
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', (callData) => {
            console.log('line 125')
            console.log(callData)
            setCallAccepted(true);

            peer.call(callData, stream);
        });
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        // connectionRef.current.destroy();
        //maybe disconnect and reconnect
    };

    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };