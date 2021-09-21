import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export default () => {
    console.log('*************** using interceptor ****************')
    const accessToken = SecureStorage.getItem('accessToken').catch(() => null);

    const customAxios = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        mode: 'cors',
    });

    customAxios.interceptors.response.use(
        (response) => {
            //request succeeds, resolve response
            new Promise((resolve, reject) => {
                resolve(response);
            });
        },
        (error) => {
            const errorResponse = error.response
            if (isTokenExpiredError(errorResponse)) {
                return resetTokenAndReattemptRequest(error, jwt)
            }
            //error is due to other reasons return it
            return Promise.reject(error)
        }
    );

    const isTokenExpiredError = (errorResponse) => {
        //JWT refresh token has expired expired (i.e. response is 403 and message is Expired Jwt)
        //othewise logout user
        console.log(errorResponse);
        return false;
    }

    let isAlreadyFetchingAccessToken = false;

    //list of waiting requests that need to be retried
    let subscribers = [];

    const resetTokenAndReattemptRequest = async (error, jwt) => {
        try {
            const { response: errorResponse } = error;
            const refreshToken = SecureStorage.getItem('refreshToken').catch(() => null);

            if (!refreshToken) {
                // We can't refresh, throw the error anyway
                return Promise.reject(error);
            }

            const retryOriginalRequest = new Promise(resolve => {
                //add the request retry queue
                addSubscriber(access_token => {
                    errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                    resolve(axios(errorResponse.config));
                });
            });
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                const response = await axios({
                    method: 'post',
                    url: `/api/auth/refresh-token/`,
                    data: {
                        refreshToken: refreshToken // Just an example, your case may vary
                    }
                });
                if (!response.data) {
                    return Promise.reject(error);
                }

                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                //save newly refresh tokens

                SecureStorage.setItem('accessToken', accessToken);
                SecureStorage.setItem('refreshToken', refreshToken);

                isAlreadyFetchingAccessToken = false;
                onAccessTokenFetched(accessToken);
            }
            return retryOriginalRequest;
        } catch (err) {
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
}