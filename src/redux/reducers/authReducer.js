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
    accessToken: SecureStorage.getItem('accessToken').catch(() => null),
    refreshToken: SecureStorage.getItem('refreshToken').catch(() => null),
    userId: SecureStorage.getItem('userId').catch(() => null)
};



export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                accessToken: undefined,
                refreshToken: undefined
            }
        case AUTH_LOGIN_SUCCESS:
            SecureStorage.setItem('accessToken', action.payload.data.accessToken);
            SecureStorage.setItem('refreshToken', action.payload.data.refreshToken);
            return {
                ...state,
                isLoading: false,
                error: undefined,
                accessToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken
            }
        case AUTH_LOGIN_FAIL:
            SecureStorage.removeItem('accessToken');
            SecureStorage.removeItem('refreshToken');
            SecureStorage.removeItem('userId');
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.error.message,
                accessToken: undefined,
                refreshToken: undefined,
                userId: undefined
            }
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                accessToken: undefined,
                refreshToken: undefined,
                userId: undefined
            }
        case AUTH_LOGOUT_SUCCESS:
        case AUTH_LOGOUT_FAIL:
            SecureStorage.removeItem('accessToken');
            SecureStorage.removeItem('refreshToken');
            SecureStorage.removeItem('userId');
            return {
                ...state,
                isLoading: false,
                error: undefined,
                accessToken: undefined,
                refreshToken: undefined,
                userId: undefined
            }
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                accessToken: undefined,
                refreshToken: undefined,
                userId: undefined
            }
        case AUTH_REGISTER_SUCCESS:
            SecureStorage.setItem('accessToken', action.payload.data.accessToken);
            SecureStorage.setItem('refreshToken', action.payload.data.refreshToken);

            return {
                ...state,
                isLoading: false,
                error: undefined,
                accessToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken
            }
        case AUTH_REGISTER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload.data.error.message,
                accessToken: undefined,
                refreshToken: undefined
            }
        case AUTH_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                userId: undefined
            }
        case AUTH_PROFILE_SUCCESS:
            SecureStorage.setItem('userId', action.payload.data.profile.userId);

            return {
                ...state,
                isLoading: false,
                error: false,
                userId: action.payload.data.profile.userId
            }
        case AUTH_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                userId: undefined
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