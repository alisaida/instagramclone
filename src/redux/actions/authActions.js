import {
    AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL,
    AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_FAIL, AUTH_LOGOUT_SUCCESS,
    AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL,
    AUTH_PROFILE_REQUEST, AUTH_PROFILE_SUCCESS, AUTH_PROFILE_FAIL,
} from '../constants/actionTypes';
import { loadProfile, loginUser, logoutUser, registerUser } from '../api/auth';
import { fetchAuthProfile } from '../api/profile';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });
    try {
        const res = await loginUser(email, password);
        if (res && res.status) {
            if (res.status === 200) {
                dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
                dispatch(fetchCurrentProfile()); //only load profile after successfully api login
            }
            else {
                dispatch({ type: AUTH_LOGIN_FAIL, payload: res.response });
            }
        }
        else {
            dispatch({ type: AUTH_LOGIN_FAIL, payload: res.response });
        }
    } catch (e) {
        dispatch({ type: AUTH_LOGIN_FAIL, payload: e.response });
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT_REQUEST });
    try {
        const res = await logoutUser();
        if (res && res.status) {
            if (res.status === 204)
                dispatch({ type: AUTH_LOGOUT_SUCCESS, payload: res });
            else
                dispatch({ type: AUTH_LOGIN_FAIL, payload: res.response });
        }
        else {
            dispatch({ type: AUTH_LOGOUT_FAIL, payload: res.response });
        }
    } catch (e) {
        dispatch({ type: AUTH_LOGOUT_FAIL, payload: e.response });
    }
}

export const register = (email, name, username, password) => async (dispatch) => {
    dispatch({ type: AUTH_REGISTER_REQUEST });
    try {
        const res = await registerUser(email, name, username, password);
        if (res && res.status) {
            if (res.status === 201) {
                dispatch({ type: AUTH_REGISTER_SUCCESS, payload: res });
                dispatch(fetchCurrentProfile()); //only load profile after successfully api register
            }
            else {
                dispatch({ type: AUTH_REGISTER_FAIL, payload: res.response });
            }
        }
        else {
            dispatch({ type: AUTH_REGISTER_FAIL, payload: res.response });
        }
    } catch (e) {
        dispatch({ type: AUTH_REGISTER_FAIL, payload: e.response });
    }
}



export const fetchCurrentProfile = () => async (dispatch) => {
    dispatch({ type: AUTH_PROFILE_REQUEST });
    try {
        const res = await fetchAuthProfile();
        // console.log(res.data)
        if (res && res.status)
            if (res.status === 200)
                dispatch({ type: AUTH_PROFILE_SUCCESS, payload: res });
            else
                dispatch({ type: AUTH_PROFILE_FAIL, payload: res?.response });
        else
            dispatch({ type: AUTH_PROFILE_FAIL, payload: res });
    } catch (e) {
        dispatch({ type: AUTH_PROFILE_FAIL, payload: e });
    }
}