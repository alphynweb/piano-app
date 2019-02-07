import * as actionTypes from '../actions/actionTypes';

export const saveFavourite = (currentKey, currentType, currentSubType, favourites) => {
    return {
        type: actionTypes.SAVE_FAVOURITE,
        currentKey,
        currentType,
        currentSubType,
        favourites
    }
};

export const sortFavourites = (sortMethod) => {
    return {
        type: actionTypes.SORT_FAVOURITES,
        sortMethod: sortMethod
    }
};

export const deleteFavourite = (id) => {
    return {
        type: actionTypes.DELETE_FAVOURITE,
        id
    }
};