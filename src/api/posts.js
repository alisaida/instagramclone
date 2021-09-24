import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export const retrievePostsByUserId = async (userId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/users/${userId}/fetchPosts/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/feed/all`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/posts/${id}/like/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'delete',
            url: `${BASE_URL}/api/posts/${id}/like/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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

export const retrievePostLikesById = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/${id}/likes/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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

export const createCommentByPostId = async (id, comment) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/api/posts/${id}/comment/new/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            mode: 'cors',
            data: {
                comment: comment
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error.response);
        return error;
    }
}