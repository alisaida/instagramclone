import axios from 'axios';
import { fetchAccessToken, removeAccessToken, storeAccessToken, fetchRefreshToken, removeRefreshToken, storeRefreshToken } from '../utils/SecureStore';

import { BASE_URL } from '@env';

export const currentAuthProfile = async () => {

    const accessToken = await fetchAccessToken();
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}:5000/api/profiles/me/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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

    const accessToken = await fetchAccessToken();
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}:5000/api/profiles/users/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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

    const accessToken = await fetchAccessToken();
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}:5000/api/profiles/new`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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