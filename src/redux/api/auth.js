import axios from 'axios';
import { BASE_URL } from '@env';

import SecureStorage from 'react-native-secure-storage';

export const loginUser = async (email, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/auth/login/`,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: {
                email: email,
                password: password
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const logoutUser = async (email, password) => {
    const refreshToken = await SecureStorage.getItem('refreshToken').catch(() => null);
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/auth/logout/`,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: {
                refreshToken: refreshToken,
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const registerUser = async (email, name, username, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/auth/register/`,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: {
                email: email,
                name: name,
                username: username,
                password: password
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const loadProfile = async () => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/profiles/me/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            mode: 'cors'
        });

        return response.profile;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}