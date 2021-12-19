import { axiosInstance } from '../utils/axiosIntance';

import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export const retrievePostsByUserId = async (userId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/users/${userId}/fetchPosts/`,
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

export const retrievePosts = async () => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/feed/all`,
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

export const retrievePostById = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/${id}/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error.response);
        return error;
    }
}

export const likePostById = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/posts/${id}/like/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

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
        const response = await axiosInstance({
            method: 'delete',
            url: `/api/posts/${id}/like/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

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
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/${id}/likes/`,
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

export const createCommentByPostId = async (id, comment) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/posts/${id}/comment/new/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                comment: comment
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const createPost = async (imageUri, caption) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/posts/new/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                imageUri: imageUri,
                caption: caption
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}