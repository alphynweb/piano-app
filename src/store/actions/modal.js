import * as actionTypes from './actionTypes';

export const showModal = (content) => {
    return {
        type: actionTypes.SHOW_MODAL,
        content: content
    };
};

export const hideModal = () => {
    return {
        type: actionTypes.HIDE_MODAL 
    };
};

export const setModalContent = (content) => {
    return {
        type: actionTypes.SET_MODAL_CONTENT,
        content: content
    };
};