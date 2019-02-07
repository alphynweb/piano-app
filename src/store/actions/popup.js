import * as actionTypes from './actionTypes';

export const showPopup = (content, hideDelay) => {
    return {
        type: actionTypes.SHOW_POPUP,
        content: content,
        hideDelay: hideDelay
    };
};

export const hidePopup = () => {
    return {
        type: actionTypes.HIDE_POPUP 
    };
};

export const setPopupContent = (content) => {
    return {
        type: actionTypes.SET_POPUP_CONTENT,
        content: content
    };
};