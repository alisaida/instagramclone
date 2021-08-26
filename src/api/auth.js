import axios from 'axios';
import { fetchAccessToken, removeAccessToken, storeAccessToken, fetchRefreshToken, removeRefreshToken, storeRefreshToken } from '../utils/SecureStore';

export const loginUser = async (email, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/api/auth/login/`,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: {
                email: email,
                password: password
            }
        })

        //successfully logged in
        if (response && response.status === 200) {
            storeAccessToken(response.data.accessToken);
            storeRefreshToken(response.data.accessToken);
        }
        return response;
    } catch (error) {
        return error;
    }

}

export const registerUser = async (email, name, username, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:5000/api/auth/register/`,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: {
                email: email,
                name: name,
                mobile: '0412378955',
                // username: username,
                password: password
            }
        })

        //successfully logged in
        if (response && response.status === 201) {
            storeAccessToken(response.data.accessToken);
            storeRefreshToken(response.data.accessToken);
        }

        return response;
    } catch (error) {
        console.log(error.response.data)
        console.log(password)
        return error;
    }

}

export const logoutUser = () => {
    const refreshToken = fetchRefreshToken();
    axios({
        method: 'post',
        url: `http://localhost:5000/api/auth/logout`,
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        data: {
            refreshToken: refreshToken
        }
    }).then(response => {
        console.log(response.data);

        //remove sensitive data
        removeAccessToken();
        removeRefreshToken();
        return response;
    }).catch(error => {
        console.log(error)
    })
}

export const register = (name, email, mobile, password) => {
    axios({
        method: 'post',
        url: `http://localhost:5000/api/auth/register/`,
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        data: {
            name: name,
            email: email,
            mobile: mobile,
            password: password
        }
    }).then(response => {
        console.log(response.data);
        storeAccessToken(response.data.accessToken);
        storeRefreshToken(response.data.accessToken);
        return response;
    }).catch(error => {
        console.log(error)
    })
}

export const refreshToken = () => {
    const refreshToken = fetchRefreshToken();
    axios({
        method: 'post',
        url: `http://localhost:5000/api/auth/refresh-token/`,
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        data: {
            refreshToken: refreshToken
        }
    }).then(response => {
        console.log(response.data);
        storeAccessToken(response.data.accessToken);
        storeRefreshToken(response.data.accessToken);
        return response;
    }).catch(error => {
        console.log(error)
    })
}