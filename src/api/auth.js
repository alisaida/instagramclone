import { axiosInstance } from '../utils/axiosIntance';

import { BASE_URL } from '@env';

export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/auth/forgot-password`,
            data: {
                email: email
            }
        })

        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const forgotPasswordWithUserId = async (userId) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/auth/forgot-pass`,
            data: {
                userId: userId
            }
        })

        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const resetPassword = async (userId, password, code) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/auth/forgot-password/${userId}/${code}`,
            data: {
                password: password
            }
        })

        return response.data;
    }
    catch (error) {
        console.log('error: ', error)
        return error;
    }
}

export const verifyAccount = async (userId, code) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/api/auth/verify-account/${userId}/${code}`,
        })

        return response.data;
    }
    catch (error) {
        console.log('error: ', error)
        return error;
    }
}