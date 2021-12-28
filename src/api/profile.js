import { axiosInstance } from '../utils/axiosIntance';
import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export const currentAuthProfile = async () => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/profiles/me/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
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
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/profiles/users/${userId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const { profile } = response.data;
        return profile;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchProfileByName = async (name) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/profiles/user?name=${name}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const { profiles } = response.data;

        return profiles;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchProfileByUsername = async (username) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/profiles/user?username=${username}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const { profiles } = response.data;
        return profiles;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const createProfile = async (username, name, profilePicture, bio) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/profiles/new`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
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
        console.log(error);
        return error;
    }
}

export const updateProfileImage = async (imageUri) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'patch',
            url: `/api/profiles/profilePicture`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                imageUri: imageUri,
            }
        })

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const updateProfileBio = async (bio) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'patch',
            url: `/api/profiles/bio`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                bio: bio,
            }
        })

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
