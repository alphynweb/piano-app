import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

const initialState = {
    error: null,
    loading: false,
    isLoggedIn: false,
    isLoggingIn: false,
    authRedirectPath: '/',
    mode: 'signin',
    userDetails: null
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        isLoggedIn: false,
        isLoggingIn: true
    });
};

const authSuccess = (state, action) => {
    const userDetails = updateObject(userDetails, action.userDetails);
    return updateObject(state, {
        error: null,
        loading: false,
        isLoggedIn: true,
        isLoggingIn: false,
        userDetails: userDetails
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isLoggedIn: false,
        isLoggingIn: false
    });
};

const logoutSuccess = (state, action) => {
    return updateObject(state, {
        localId: null,
        isLoggedIn: false,
        userDetails: null
    });
};

const addUserStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const addUserSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        userDetails: action.userDetails
    });
};

const addUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const switchAuthMode = (state, action) => {
    return updateObject(state, {
        error: null,
        mode: action.mode
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.LOGOUT_SUCCESS:
            return logoutSuccess(state, action);
        case actionTypes.ADD_USER_START:
            return addUserStart(state, action);
        case actionTypes.ADD_USER_SUCCESS:
            return addUserSuccess(state, action);
            case actionTypes.ADD_USER_FAIL:
            return addUserFail(state, action);
        case actionTypes.SWITCH_AUTH_MODE:
            return switchAuthMode(state, action);
        default:
            return state;
    }
};

export default reducer;