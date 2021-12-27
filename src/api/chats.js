import { axiosInstance } from '../utils/axiosIntance';

import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';


export const retrieveMyChats = async () => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/chats/me/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data.chatRooms;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const createChatRoom = async (username) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/chats/new/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                username: username
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const retrieveChatsWithRecipient = async (userId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/chats/users/${userId}/me`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return response.data;
    }
    catch (error) {
        if (error.response.status !== 404) {
            console.log(error)
        }
        return error;
    }
}

export const retrieveChatsByUserId = async (userId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/chats/users/${userId}/chatrooms/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data.chatRooms;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const retrieveRecipientsByChatRoomId = async (chatRoomId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/chats/${chatRoomId}/users/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data.recipients;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const retrieveMessagesByChatRoomId = async (chatRoomId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/chats/${chatRoomId}/messages/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const createMessage = async (chatRoomId, content, imageUri) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/chats/${chatRoomId}/messages/new`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                content: content,
                imageUri: imageUri
            }
        })

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}