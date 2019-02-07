import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

const initialState = {
    show: false,
    content: null
};

const showModal = (state, action) => {
    return updateObject(state, {
        show: true,
        content: action.content
    });
};

const hideModal = (state, action) => {
    return updateObject(state, {
        show: false
    });
};

const setModalContent = (state, action) => {
    return updateObject(state, {
        content: action.content
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL: return showModal(state, action);
        case actionTypes.HIDE_MODAL: return hideModal(state, action);
        case actionTypes.SET_MODAL_CONTENT: return setModalContent(state, action);
        default: return state;
    };
};

export default reducer;