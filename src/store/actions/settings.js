import * as actionTypes from '../actions/actionTypes';

import { keyboardSetup } from '../../keyboardSetup';

import firebaseObject from '../../firebaseInit';

export const fetchUserSettingsStart = () => {
    return {
        type: actionTypes.FETCH_USER_SETTINGS_START
    };
};

export const fetchUserSettingsSuccess = (settingsData) => {
    if (settingsData) {
        const currentKey = settingsData.currentDisplay.currentKey;
        const baseNote = currentKey;
        const baseNoteIndex = keyboardSetup.findIndex(note => note.name === currentKey);

        return {
            baseNote: baseNote,
            baseNoteIndex: baseNoteIndex,
            type: actionTypes.FETCH_USER_SETTINGS_SUCCESS,
            settings: settingsData
        };
    } else {
        return {
            baseNote: 'C',
            baseNoteIndex: 0,
            type: actionTypes.FETCH_USER_SETTINGS_SUCCESS,
            settings: null
        };
    }
};

export const fetchUserSettingsFail = () => {
    return {
        type: actionTypes.FETCH_USER_SETTINGS_FAIL
    };
};

export const fetchUserSettings = (localId) => {
    const db = firebaseObject.database();

    return dispatch => {
        dispatch(fetchUserSettingsStart());
        const fetchedSettings = db.ref('/users/' + localId + '/appSettings');
        try {
            fetchedSettings.on('value', snapshot => {
                const appSettings = snapshot.val();
                dispatch(fetchUserSettingsSuccess(appSettings));
            });
        } catch (error) {
            dispatch(fetchUserSettingsFail());
        };
    };
};

// SAVE USER SETTINGS //

export const saveUserSettingsStart = (userSettings) => {
    return {
        type: actionTypes.SAVE_USER_SETTINGS_START,
        userSettings: userSettings
    };
};

export const saveUserSettingsSuccess = (userSettings) => {
    return {
        type: actionTypes.SAVE_USER_SETTINGS_SUCCESS,
        savedSettings: userSettings,
        hideDelay: true,
        content: "Your settings have been saved"
    };
};

export const saveUserSettingsFail = () => {
    return {
        type: actionTypes.SAVE_USER_SETTINGS_FAIL
    }
};

// Asynchronous action
export const saveUserSettings = (userSettings, localId) => {
    const db = firebaseObject.database();

    return dispatch => {
        dispatch(saveUserSettingsStart(userSettings));
        if (localId) {
            try {
                db.ref('users/' + localId).update(userSettings)
                    .then(dispatch(saveUserSettingsSuccess(userSettings)));
            } catch (error) {
                dispatch(saveUserSettingsFail());
            };
        }
    };
};

export const selectFavourite = (favouriteInfo) => {
    const currentKey = favouriteInfo.currentkey;
    const baseNote = currentKey;
    const baseNoteIndex = keyboardSetup.findIndex(note => note.name === currentKey);
    return {
        type: actionTypes.SELECT_FAVOURITE,
        favouriteInfo: favouriteInfo,
        baseNote: baseNote,
        baseNoteIndex: baseNoteIndex
    };
};