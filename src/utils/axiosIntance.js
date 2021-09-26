import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import { BASE_URL } from '@env';

import store from '../redux/store';
import { logout } from '../redux/actions/authActions';
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'cors',
});

axiosInstance.interceptors.response.use(
    (response) => {
        //request succeeds, return response
        return response;
    },
    (error) => {
        const errorResponse = error.response
        if (isTokenExpiredError(errorResponse)) {
            return resetTokenAndReattemptRequest(error)
        }
        //error is due to other reasons return it
        return Promise.reject(error)
    }
);

const isTokenExpiredError = (errorResponse) => {
    //JWT refresh token has expired expired (i.e. response is 403 and message is Expired Jwt)
    if (errorResponse.status === 401) {
        if (errorResponse && errorResponse.data && errorResponse.data.error && errorResponse.data.error.message) {
            return (errorResponse.data.error.message === 'Expired jwt');
        }
        return false;
    }
    return false;
}

let isAlreadyFetchingAccessToken = false;

//list of waiting requests that need to be retried
let subscribers = [];

const resetTokenAndReattemptRequest = async (error) => {

    try {
        const { response: errorResponse } = error;

        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
            // We can't refresh, throw the error anyway
            console.log('Failed to retrieve refreshToken from device - logging out user');
            dispatch(logout())
            return Promise.reject(error);
        }

        const retryOriginalRequest = new Promise(resolve => {
            //add the request retry queue
            addSubscriber(accessToken => {
                errorResponse.config.headers.Authorization = 'Bearer ' + accessToken;
                resolve(axios(errorResponse.config));
            });
        });
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;

            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/api/auth/refresh-token/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                data: {
                    refreshToken: refreshToken
                }
            });

            if (!response || !response.data) {
                return Promise.reject(error);
            }

            const access_token = response.data.accessToken;
            const refresh_token = response.data.refreshToken;

            // save newly refresh tokens
            await SecureStorage.setItem('accessToken', access_token);
            await SecureStorage.setItem('refreshToken', refresh_token);

            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(access_token);
        }
        return retryOriginalRequest;
    } catch (err) {
        console.log('Failed to generate new refreshToken - logging out user');
        store.dispatch(logout());
        return Promise.reject(err);
    }
}

const onAccessTokenFetched = (access_token) => {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

const addSubscriber = (callback) => {
    subscribers.push(callback);
}

const getAccessToken = async () => {
    return await SecureStorage.getItem('accessToken').catch(() => null);
}

const getRefreshToken = async () => {
    return await SecureStorage.getItem('refreshToken').catch(() => null);
}