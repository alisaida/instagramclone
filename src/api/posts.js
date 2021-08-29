import axios from 'axios';
import { fetchAccessToken, removeAccessToken, storeAccessToken, fetchRefreshToken, removeRefreshToken, storeRefreshToken } from '../utils/SecureStore';

import { BASE_URL } from 'react-native-dotenv';

export const retrievePosts = async () => {

    const accessToken = await fetchAccessToken();

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}:5000/api/posts/feed/all`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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