import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utilities';

const initialState = {
    favourites: [],
    favouritesOrderBy: 'Type' // Display list of favourites by key or type
};

const resetSettings = () => {
    return initialState;
}

const saveFavourite = (state, action) => {
    const currentType = action.currentType;
    const currentSubType = action.currentType === 'Scale' ? action.currentSubType.Scale : action.currentSubType.Chord;
    const currentKey = action.currentKey;
    const newFavourite = {
        currentType: currentType,
        currentSubType: currentSubType,
        currentKey: currentKey
    };
    const newFavouritesList = action.favourites.slice();
    newFavouritesList.push(newFavourite);
    return updateObject(state, {
        favourites: newFavouritesList
    });
};

const sortFavourites = (state, action) => {
    return updateObject(state, {
        favouritesOrderBy: action.sortMethod
    });
};

const deleteFavourite = (state, action) => {
    const favouriteIndex = state.favourites.findIndex(favourite => {
        const favouriteId = favourite.currentKey.concat(" ", favourite.currentType, " ", favourite.currentSubType);

        return favouriteId === action.id;
    });

    const newFavourites = [...state.favourites];
    newFavourites.splice(favouriteIndex, 1);

    return updateObject(state, {
        favourites: newFavourites
    });
};

const fetchUserSettingsSuccess = (state, action) => {
    if (!action.settings) return state;
    
    // Favourites
    const favouritesInfo = action.settings.favouritesInfo;
    const favourites = favouritesInfo.favourites ? favouritesInfo.favourites : [];
    const favouritesOrderBy = favouritesInfo.orderBy;

    return updateObject(state, {
        favourites: favourites,
        favouritesOrderBy: favouritesOrderBy
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Favourites
        case actionTypes.SAVE_FAVOURITE: return saveFavourite(state, action);
        case actionTypes.SORT_FAVOURITES: return sortFavourites(state, action);
        case actionTypes.DELETE_FAVOURITE: return deleteFavourite(state, action);
        // Settings
        case actionTypes.FETCH_USER_SETTINGS_SUCCESS: return fetchUserSettingsSuccess(state, action);
        // Logout
        case actionTypes.LOGOUT_SUCCESS: return resetSettings();
        default: return state;
    }
};

export default reducer;