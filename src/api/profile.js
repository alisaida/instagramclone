import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export const currentAuthProfile = async () => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/profiles/me/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })

        const { profile } = response.data;

        return profile;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchProfileById = async (userId) => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/profiles/users/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })

        const { profile } = response.data;
        return profile;
    }
    catch (error) {
        console.log(error.request._url);
        // return error;
    }
}

export const createProfile = async (username, name, profilePicture, bio) => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/profiles/new`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors',
            data: {
                username: username,
                name: name,
                profilePicture: profilePicture,
                bio: bio
            }
        })

        const { profile } = response.data;
        return profile;
    }
    catch (error) {
        console.log(error.request._url);
        // return error;
    }
}