import { fetchAccessToken, removeAccessToken, storeAccessToken, fetchRefreshToken, removeRefreshToken, storeRefreshToken } from '../utils/SecureStore';

export const currentAuthProfile = (email, password) => {
    const refreshToken = fetchRefreshToken();
    axios({
        method: 'get',
        url: `http://localhost:5000/api/profile/me/`,
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        data: {
            refreshToken: refreshToken
        }
    }).then(response => {
        console.log(response.data);
        return response;
    }).catch(error => {
        console.log(error)
    })
}