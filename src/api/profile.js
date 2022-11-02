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
            url: `/api/profiles/searchByName?name=${name}`,
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
            url: `/api/profiles/searchByUsername?username=${username}`,
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

export const fetchProfileByNameOrUsername = async (name) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/profiles/search?name=${name}`,
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

export const updateProfile = async (username, name, profilePicture, bio, isPublic) => {
    console.log('sending update profile request')
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/profiles/update`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                username: username,
                name: name,
                profilePicture: profilePicture,
                bio: bio,
                isPublic: isPublic
            }
        })

        return response;
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

export const fetchFollowingBetweenUsersIds = async (userId1, userId2) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'get',
            url: `/api/profiles/${userId1}/follow/${userId2}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (response && response.data && response.status && response.status === 200) {
            return response.data.follow;
        }

        return null;
    }
    catch (error) {
        if (error && error.response) {
            if (error.response.status === 404) {
                return null;
            } else {
                //only log non 404 responses as they are ok
                console.log(error);
                return error;
            }
        }
    }
}

export const fetchFollowingsByUserIdAndStatus = async (userId, status, page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/profiles/${userId}/followings?page=${page}&size=${size}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                status: status
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

export const fetchFollowersByUserIdAndStatus = async (userId, status, page, size) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/profiles/${userId}/followers?page=${page}&size=${size}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                status: status
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

// res.status(201).send('Following created');
export const followUserById = async (userId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/profiles/${userId}/follow/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

//res.status(202).send('Profile unfollowed');
export const unFollowUserById = async (userId, relation) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/profiles/follow/${userId}/unfollow/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                relation: relation
            }
        })

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

//res.status(201).send('Following accepted');
export const acceptFollowing = async (followId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'patch',
            url: `/api/profiles/follow/${followId}/accept`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const rejectFollowing = async (followId) => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axiosInstance({
            method: 'delete',
            url: `/api/profiles/follow/${followId}/reject`,
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