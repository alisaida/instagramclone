import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export const retrievePostsByUserId = async (userId) => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/users/${userId}/fetchPosts/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const retrievePosts = async () => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/feed/all`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const retrievePostById = async (id) => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const likePostById = async (id) => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/posts/${id}/like/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const unlikePostById = async (id) => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'delete',
            url: `${BASE_URL}/api/posts/${id}/like/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
            },
            mode: 'cors'
        })
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}