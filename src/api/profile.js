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