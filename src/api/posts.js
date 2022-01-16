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

export const retrievePosts = async (page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/feed/all?page=${page}&size=${size}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (response && response.status && response.status === 200)
            return response.data;
        return null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const retrieveLikedPosts = async (page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/likes/me?page=${page}&size=${size}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (response && response.status && response.status === 200)
            return response.data;
        return [];
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export const retrieveSavedPosts = async (page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/bookmarks/me?page=${page}&size=${size}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (response && response.status && response.status === 200)
            return response.data;
        return [];
    }
    catch (error) {
        return [];
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

        if (response && response.status && response.status === 200)
            return response.data;
        return null;
    }
    catch (error) {
        return null;
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

export const checkIsLiked = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/${id}/likes/me`,
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

export const bookmarkPostById = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/posts/${id}/bookmark/`,
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

export const unBookmarkPostById = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'delete',
            url: `/api/posts/${id}/bookmark/`,
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

export const checkIsBookmarked = async (id) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/${id}/bookmarks/me`,
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

export const retrievePostLikesById = async (id, page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/${id}/likes?page=${page}&size=${size}/`,
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

export const retrievePostCommentsById = async (id, page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/posts/${id}/comments?page=${page}&size=${size}/`,
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

        return response;
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

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}