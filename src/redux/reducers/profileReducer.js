import SecureStorage from 'react-native-secure-storage'
import { CURRENT_PROFILE_REQUEST, CURRENT_PROFILE_SUCCESS, CURRENT_PROFILE_FAIL } from '../constants/actionTypes';

const initialState = {
    isLoading: false,
    error: undefined,
    authProfile: SecureStorage.getItem('authProfile').catch(() => null)
};

export default profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                authProfile: undefined
            }
        case CURRENT_PROFILE_SUCCESS:
            SecureStorage.setItem('authProfile', JSON.stringify({
                authProfile: action.payload.data
            }));

            return {
                ...state,
                isLoading: false,
                error: false,
                authProfile: action.payload.data
            }
        case CURRENT_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                authProfile: undefined
            }
        default:
            return state;
    }
}