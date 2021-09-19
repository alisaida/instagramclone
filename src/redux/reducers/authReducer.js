import SecureStorage from 'react-native-secure-storage'
import {
    AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL,
    AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL,
    AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL,
    AUTH_PROFILE_REQUEST, AUTH_PROFILE_SUCCESS, AUTH_PROFILE_FAIL,
    AUTH_CLEAR_ERRORS
} from '../constants/actionTypes';

const initialState = {
    isLoading: false,
    error: undefined,
    authTokens: SecureStorage.getItem('authTokens').catch(() => null),
    authProfile: SecureStorage.getItem('authProfile').catch(() => null)
};

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                authTokens: undefined,
            }
        case AUTH_LOGIN_SUCCESS:
            SecureStorage.setItem('authTokens', JSON.stringify({
                accessToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken
            }));

            return {
                ...state,
                isLoading: false,
                error: undefined,
                authTokens: action.payload.data
            }
        case AUTH_LOGIN_FAIL:
            SecureStorage.removeItem('authTokens');
            SecureStorage.removeItem('authProfile');
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.error.message,
                authTokens: null,
                authProfile: null
            }
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            }
        case AUTH_LOGOUT_SUCCESS:
        case AUTH_LOGOUT_FAIL:
            SecureStorage.removeItem('authTokens');
            SecureStorage.removeItem('authProfile');
            return {
                ...state,
                isLoading: false,
                error: undefined,
                authTokens: undefined,
            }
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                authTokens: undefined,
            }
        case AUTH_REGISTER_SUCCESS:
            SecureStorage.setItem('authTokens', JSON.stringify({
                accessToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken
            }));

            return {
                ...state,
                isLoading: false,
                error: undefined,
                authTokens: JSON.stringify({
                    accessToken: action.payload.data.accessToken,
                    refreshToken: action.payload.data.refreshToken
                })
            }
        case AUTH_REGISTER_FAIL:
            SecureStorage.removeItem('authTokens');
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.error.message,
                authTokens: null,
            }
        case AUTH_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                authProfile: undefined
            }
        case AUTH_PROFILE_SUCCESS:
            SecureStorage.setItem('authProfile', JSON.stringify({
                userId: action.payload.data.profile.userId,
                username: action.payload.data.profile.username,
                name: action.payload.data.profile.name
            }));

            return {
                ...state,
                isLoading: false,
                error: false,
                authProfile: JSON.stringify({
                    userId: action.payload.data.profile.userId,
                    username: action.payload.data.profile.username,
                    name: action.payload.data.profile.name
                })
            }
        case AUTH_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                authProfile: undefined
            }
        case AUTH_CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}