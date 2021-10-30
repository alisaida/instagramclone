import io from 'socket.io-client';
import Peer from 'react-native-peerjs';

import { CALL_DATA, CALL_ENDED, CALL_ACCEPTED, MY_ID, MY_STREAM, THEIR_STREAM } from '../constants/actionTypes';

// export const CALL_SERVICE_URI = 'http://192.168.0.4:5000';

// export const socket = io(`${CALL_SERVICE_URI}`, {
//     forceNew: true,
// });

// socket.on('connection', () => console.log('connected client'));

// const peerServer = new Peer(undefined, {
//     host: 'http://192.168.0.4',
//     secure: false, //requires ssl certificates
//     port: 5000,
//     path: '/'
// });

// peerServer.on('connection', () => console.log('Connection established'));

// export const initCall = () => async (dispatch) => {
//     socket.on('me', (id) => {
//         dispatch({ type: MY_ID, payload: id });
//     });

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//         // setCall({ isReceivingCall: true, from, name: callerName, signal });
//         const payload = {
//             isReceivingCall: true,
//             from: from,
//             name: callerName,
//             signal: signal
//         }
//         dispatch({ type: CALL_DATA, payload: payload });
//     });
// }

// export const initMyStream = (myStream) => async (dispatch) => {
//     dispatch({ type: MY_STREAM, payload: myStream });
// }

// export const answerCall = () => async (dispatch) => {
//     console.error('hey')
//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     peer.on('signal', (data) => {
//         socket.emit('answerCall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//         dispatch({ type: THEIR_STREAM, payload: currentStream });
//     });

//     peer.signal(call.signal);
// }

// export const callUser = (id, stream) => async (dispatch) => {
//     console.log('calling user')
//     const peer = new Peer({ initiator: true, trickle: false, stream });

//     peer.on('signal', (data) => {
//         socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
//     });

//     peer.on('stream', (currentStream) => {
//         dispatch({ type: THEIR_STREAM, payload: currentStream });
//     });

//     socket.on('callAccepted', (signal) => {
//         dispatch({ type: CALL_ACCEPTED, payload: true });
//         peer.signal(signal);
//     });
// }

// export const endCall = () => async (dispatch) => {
//     dispatch({ type: CALL_ENDED, payload: true });
// }