import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import { BASE_URL } from '@env';

export const retrievePosts = async () => {
    const authTokens = await SecureStorage.getItem('authTokens').catch(() => null);
    const jwt = JSON.parse(authTokens);
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/posts/feed/all`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.accessToken}`
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