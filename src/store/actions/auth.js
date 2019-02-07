import * as actionTypes from '../actions/actionTypes';

import firebaseObject from '../../firebaseInit';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (localId, userDetails, settingsToSave, rememberMe) => {
    sessionStorage.setItem('localId', localId);
    if (rememberMe) {
        localStorage.setItem('localId', localId);
    }
    return {
        type: actionTypes.AUTH_SUCCESS,
        localId: localId,
        userDetails: userDetails,
        settingsToSave: settingsToSave,
        hideDelay: true
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email, password, settingsToSave, rememberMe) => {
    return dispatch => {
        dispatch(authStart());
        firebaseObject.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                const user = response.user;
                const uid = user.uid;
                const email = user.email;
                const displayName = user.displayName;
                const userDetails = {
                    email: email,
                    displayName: displayName
                };
                dispatch(authSuccess(uid, userDetails, settingsToSave, rememberMe))
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};

export const authCheck = () => {
    return dispatch => {
        firebaseObject.auth().onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid;
                const email = user.email;
                const displayName = user.displayName;
                const userDetails = {
                    email: email,
                    displayName: displayName
                };
                // Check for auth timeout
                const lastSignIntIme = Date.parse(user.metadata.lastSignInTime);
                const now = Date.now();
                const signInTimeoutLength = 1000 * 60 * 60 * 4; // 4 hours
                const timeSinceLastSignIn = now - lastSignIntIme;

                // If timed out and nothing found in session storage then require login again - remember me ticked but timed out
                if (timeSinceLastSignIn > signInTimeoutLength && !sessionStorage.getItem('localId')) {
                    localStorage.removeItem('localId');
                } else if (!localStorage.getItem('localId') && !sessionStorage.getItem('localId')) { // Remember me not ticked and browser been closed and opened again - require login
                } else { // Logged in
                    dispatch(authSuccess(uid, userDetails, null))
                }
            } else {
            }
        });
    };
};

export const addUserStart = () => {
    return {
        type: actionTypes.ADD_USER_START
    };
};

export const signupSuccess = (userDetails, settingsToSave) => {
    return {
        type: actionTypes.ADD_USER_SUCCESS,
        userDetails: userDetails,
        settingsToSave: settingsToSave
    }
};

export const signupFail = (error) => {
    return {
        type: actionTypes.ADD_USER_FAIL,
        error: error
    }
};

export const signup = (displayName, email, password, settingsToSave, rememberMe) => {
    return dispatch => {
        dispatch(addUserStart());
        firebaseObject.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebaseObject.auth().currentUser;
                user.updateProfile({
                    displayName: displayName
                })
                    .then(() => {
                        const uid = user.uid;
                        const userDetails = {
                            email: email,
                            displayName: displayName
                        };
                        sessionStorage.setItem('localId', uid);
                        if (rememberMe) {
                            localStorage.setItem('localId', uid);
                        };
                        dispatch(authSuccess(uid, userDetails, settingsToSave, rememberMe))
                    });
            })
            .catch(error => {
                dispatch(signupFail(error));
            });
    };
};

export const logoutSuccess = () => {
    localStorage.removeItem('localId');
    sessionStorage.removeItem('localId');
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        content: "You have logged out",
        hideDelay: true
    }
};

export const logoutStart = () => {
    return dispatch => {
        firebaseObject.auth().signOut()
            .then(dispatch(logoutSuccess()))
            .catch();
    };
};

export const switchAuthMode = (mode) => {
    return {
        type: actionTypes.SWITCH_AUTH_MODE,
        mode: mode
    };
};

