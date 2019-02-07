export {
    changeCurrentKey,
    changeCurrentType,
    changeCurrentSubType,
    changeNoOctaves,
    changeCurrentNotePlaying,
    startPlayback,
    stopPlayback
} from './notes';

export {
    fetchUserSettings,
    saveUserSettingsStart,
    saveUserSettings,
    selectFavourite
} from './settings';

export {
    saveFavourite,
    sortFavourites,
    deleteFavourite
} from './favourites';

export {
    // Auth
    authStart,
    authSuccess,
    authFail,
    authCheck,
    // Logout
    logoutStart,
    logoutSuccess,
    // Signup
    signupStart,
    signupSuccess,
    signupFail,
    // Switch auth mode
    switchAuthMode,
} from './auth'; 

export {
    showModal,
    hideModal,
    setModalContent
} from './modal';

export {
    showPopup,
    hidePopup,
    setPopupContent
} from './popup';