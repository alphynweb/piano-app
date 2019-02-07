import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

const initialState = {
    isFetchingSettings: false,
    settingsFetched: false,
    isSavingSettings: false,
    settingsSaved: false,
    settingsToSave: null,
    savedSettings: null
};

// SAVE USER SETTINGS //

const saveUserSettingsStart = (state, action) => {
    return updateObject(state, {
        settingsToSave: action.userSettings,
        isSavingSettings: true,
        settingsSaved: false
    });
};

const saveUserSettingsSuccess = (state, action) => {
    return updateObject(state, {
        settingsToSave: null,
        isSavingSettings: false,
        settingsSaved: true,
        savedSettings: action.savedSettings
    });
};

// FETCH USER SETTINGS //

const fetchUserSettingsStart = (state, action) => {
    return updateObject(state, {
        isFetchingSettings: true,
        settingsFetched: false
    });
};

const fetchUserSettingsSuccess = (state, action) => {
    // If no settings are set already then default to initial settings
    if (!action.settings) {
        return updateObject(state, {
            isFetchingSettings: false,
            settingsFetched: true
        });
    }

    const baseNote = action.settings.baseNote;
    const baseNoteIndex = action.settings.baseNoteIndex;
    const currentDisplay = action.settings.currentDisplay;
    const currentKey = currentDisplay.currentKey;
    const currentType = currentDisplay.currentType;
    const currentSubType = currentDisplay.currentSubType;
    const noOctaves = currentDisplay.noOctaves;

    return updateObject(state, {
        baseNote: baseNote,
        baseNoteIndex: baseNoteIndex,
        currentKey: currentKey,
        currentType: currentType,
        currentSubType: currentSubType,
        octaves: noOctaves,
        isFetchingSettings: false,
        settingsFetched: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Settings
        case actionTypes.FETCH_USER_SETTINGS_START: return fetchUserSettingsStart(state, action);
        case actionTypes.FETCH_USER_SETTINGS_SUCCESS: return fetchUserSettingsSuccess(state, action);
        case actionTypes.SAVE_USER_SETTINGS_START: return saveUserSettingsStart(state, action);
        case actionTypes.SAVE_USER_SETTINGS_SUCCESS: return saveUserSettingsSuccess(state, action);
        default: return state;
    }
};

export default reducer;