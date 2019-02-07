import * as actionTypes from '../actions/actionTypes';

import {keyboardSetup} from '../../keyboardSetup';

export const changeCurrentKey = (updatedKey) => {
    const baseNote = updatedKey;
    const baseNoteIndex = keyboardSetup.findIndex(note => note.name === updatedKey);
    
    return {
        baseNote: baseNote,
        baseNoteIndex: baseNoteIndex,
        type: actionTypes.CHANGE_CURRENT_KEY,
        currentKey: updatedKey
    };
};

export const changeCurrentType = (updatedType) => {
    return {
        type: actionTypes.CHANGE_CURRENT_TYPE,
        currentType: updatedType
    };
};

export const changeCurrentSubType = (updatedType, updatedSubType) => {
    return {
        type: actionTypes.CHANGE_CURRENT_SUBTYPE,
        currentType: updatedType,
        currentSubType: updatedSubType
    };
};

export const changeNoOctaves = (noOctaves) => {
    return {
        type: actionTypes.CHANGE_NO_OCTAVES,
        octaves: parseInt(noOctaves)
    }
};

export const changeCurrentNotePlaying = (noteIndex, noteName) => {
    return {
        type: actionTypes.CHANGE_CURRENT_NOTE_PLAYING,
        currentIsPlayingIndex: noteIndex,
        currentIsPlayingName: noteName
    };
};

export const startPlayback = () => {
    return {
        type: actionTypes.START_PLAYBACK
    };
};

export const stopPlayback = () => {
    return {
        type: actionTypes.STOP_PLAYBACK
    };
}