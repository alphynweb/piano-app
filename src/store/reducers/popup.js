import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

const initialState = {
    show: false,
    content: null,
    hideDelay: false
};

const showPopup = (state, action) => {
    return updateObject(state, {
        show: true,
        content: action.content,
        hideDelay: action.hideDelay,
        content: action.content
    });
};

const hidePopup = (state, action) => {
    return updateObject(state, {
        show: false,
        hideDelay: false
    });
};

const setPopupContent = (state, action) => {
    return updateObject(state, {
        content: action.content
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_POPUP: return showPopup(state, action);
        case actionTypes.HIDE_POPUP: return hidePopup(state, action);
        case actionTypes.SET_POPUP_CONTENT: return setPopupContent(state, action);
        // Settings saved
        case actionTypes.SAVE_USER_SETTINGS_SUCCESS: return showPopup(state, action);
        // Auth successful
        case actionTypes.AUTH_SUCCESS: return hidePopup(state, action);
        // Logout successful
        case actionTypes.LOGOUT_SUCCESS: return showPopup(state, action);
        default: return state;
    };
};

export default reducer;