import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

import { scaleChordInfo } from '../../scaleChordInfo';

const initialState = {
    baseNote: 'C', // Base note name
    baseNoteIndex: 0, // Base note index
    currentKey: 'C',
    currentType: 'Scale',
    currentSubType: {
        Scale: 'Major',
        Chord: 'Major'
    },
    currentIsPlayingIndex: 0, // For playback,
    currentIsPlayingNote: 'C',
    isPlaying: false,
    semitonesUp: [2, 2, 1, 2, 2, 2, 1], // Major scale
    semitonesUpDown: [2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2], // Major scale
    octaves: 1
};

const resetSettings = () => {
    return initialState;
};

const calculateSemitonesUp = (type, subType) => {
    const info = scaleChordInfo.find(scaleChord => scaleChord.type === type && scaleChord.subType === subType);
    return info.semitones;
};

const calculateSemitonesUpDown = (type, subType) => {
    const info = scaleChordInfo.find(scaleChord => scaleChord.type === type && scaleChord.subType === subType);
    const semitonesUp = info.semitones;
    const semitonesDown = [...semitonesUp].map(semitone => -semitone).reverse();
    const semitonesUpDown = semitonesUp.concat(semitonesDown);

    return semitonesUpDown;
};

const changeCurrentKey = (state, action) => {
    return updateObject(state, {
        baseNote: action.baseNote,
        baseNoteIndex: action.baseNoteIndex,
        currentKey: action.currentKey
    });
};

const changeCurrentType = (state, action) => {
    // Calculate new semitones
    const type = action.currentType;
    const subType = action.currentType === 'Scale' ? state.currentSubType.Scale : state.currentSubType.Chord;

    const semitonesUp = calculateSemitonesUp(type, subType);
    const semitonesUpDown = calculateSemitonesUpDown(type, subType);

    return updateObject(state, {
        currentType: action.currentType,
        semitonesUp: semitonesUp,
        semitonesUpDown: semitonesUpDown
    });
};

const changeCurrentSubType = (state, action) => {
    // Calculate new semitones
    const type = action.currentType;
    const subType = action.currentSubType;

    const semitonesUp = calculateSemitonesUp(type, subType);
    const semitonesUpDown = calculateSemitonesUpDown(type, subType);

    const currentType = action.currentType;
    const currentSubType = action.currentSubType;
    const updatedSubTypeObject = currentType === 'Scale' ?
        {
            Scale: currentSubType,
            Chord: state.currentSubType.Chord
        } :
        {
            Scale: state.currentSubType.Scale,
            Chord: currentSubType
        };
    const updatedSubType = updateObject(state.currentSubType, updatedSubTypeObject);

    return updateObject(state, {
        currentType: currentType,
        currentSubType: updatedSubType,
        semitonesUp: semitonesUp,
        semitonesUpDown: semitonesUpDown
    });
};

const changeCurrentNotePlaying = (state, action) => {
    return updateObject(state, {
        currentIsPlayingIndex: action.currentIsPlayingIndex,
        currentIsPlayingNote: action.currentIsPlayingName
    });
};

const selectFavourite = (state, action) => {
    const { currenttype, currentsubtype, currentkey } = action.favouriteInfo;

    // Calculate new semitones
    const type = currenttype;
    const subType = currentsubtype;

    const semitonesUp = calculateSemitonesUp(type, subType);
    const semitonesUpDown = calculateSemitonesUpDown(type, subType);

    const updatedSubTypeObject = currenttype === 'Scale' ?
        {
            Scale: currentsubtype,
            Chord: state.currentSubType.Chord
        } :
        {
            Scale: state.currentSubType.Scale,
            Chord: currentsubtype
        };
    const updatedSubType = updateObject(state.currentSubType, updatedSubTypeObject);

    return updateObject(state, {
        baseNote: action.baseNote,
        baseNoteIndex: action.baseNoteIndex,
        currentKey: currentkey,
        currentType: currenttype,
        currentSubType: updatedSubType,
        semitonesUp: semitonesUp,
        semitonesUpDown: semitonesUpDown
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
        return initialState;
    };
    // Current display
    const currentDisplay = action.settings.currentDisplay;
    const currentKey = currentDisplay.currentKey;
    const currentType = currentDisplay.currentType;
    const currentSubType = currentDisplay.currentSubType;
    const noOctaves = currentDisplay.noOctaves;

    // Calculate new semitones
    const type = currentType;
    const subType = type === 'Scale' ? currentSubType.Scale : currentSubType.Chord;

    const semitonesUp = calculateSemitonesUp(type, subType);
    const semitonesUpDown = calculateSemitonesUpDown(type, subType);

    const baseNote = action.baseNote;
    const baseNoteIndex = action.baseNoteIndex;

    return updateObject(state, {
        baseNote: baseNote,
        baseNoteIndex: baseNoteIndex,
        currentKey: currentKey,
        currentType: currentType,
        currentSubType: currentSubType,
        octaves: noOctaves,
        semitonesUp: semitonesUp,
        semitonesUpDown: semitonesUpDown
    });
};

const startPlayback = (state, action) => {
    return updateObject(state, {
        isPlaying: true
    });
};

const stopPlayback = (state, action) => {
    return updateObject(state, {
        isPlaying: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Notes
        case actionTypes.START_PLAYBACK: return startPlayback(state, action);
        case actionTypes.STOP_PLAYBACK: return stopPlayback(state, action);
        // Keyboard settings
        case actionTypes.CHANGE_CURRENT_KEY: return changeCurrentKey(state, action);
        case actionTypes.CHANGE_CURRENT_TYPE: return changeCurrentType(state, action);
        case actionTypes.CHANGE_CURRENT_SUBTYPE: return changeCurrentSubType(state, action);
        case actionTypes.CHANGE_CURRENT_NOTE_PLAYING: return changeCurrentNotePlaying(state, action);
        // User settings
        case actionTypes.FETCH_USER_SETTINGS_START: return fetchUserSettingsStart(state, action);
        case actionTypes.FETCH_USER_SETTINGS_SUCCESS: return fetchUserSettingsSuccess(state, action);
        // Favourites
        case actionTypes.SELECT_FAVOURITE: return selectFavourite(state, action);
        // Auth
        case actionTypes.LOGOUT_SUCCESS: return resetSettings();
        default: return state;
    };
};

export default reducer;