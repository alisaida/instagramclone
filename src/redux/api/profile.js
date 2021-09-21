import axios from 'axios';
import SecureStorage from 'react-native-secure-storage'

import { BASE_URL } from '@env';

export const fetchAuthProfile = async () => {
    const accessToken = await SecureStorage.getItem('accessToken').catch(() => null);

    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/api/profiles/me/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            mode: 'cors'
        });

        return response;
    }
    catch (error) {
        // console.log(error);
        return error;
    }
}