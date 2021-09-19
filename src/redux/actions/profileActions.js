import {
    CURRENT_PROFILE_REQUEST,
    CURRENT_PROFILE_SUCCESS,
    CURRENT_PROFILE_FAIL
} from '../constants/actionTypes';
import { fetchAuthProfile } from '../api/profile';

export const fetchCurrentProfile = () => async (dispatch) => {
    dispatch({ type: CURRENT_PROFILE_REQUEST });
    try {
        const res = await fetchAuthProfile();
        if (res && res.status)
            if (res.status === 200)
                dispatch({ type: CURRENT_PROFILE_SUCCESS, payload: res });
            else
                dispatch({ type: CURRENT_PROFILE_FAIL, payload: res?.response });
        else
            dispatch({ type: CURRENT_PROFILE_FAIL, payload: res });
    } catch (e) {
        dispatch({ type: CURRENT_PROFILE_FAIL, payload: e });
    }
}