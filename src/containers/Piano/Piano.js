import React, { Component } from 'react';
import { connect } from 'react-redux';

// Keyboard components
import Keyboard from '../../components/Keyboard/Keyboard';
import KeyboardControls from '../../components/Keyboard/KeyboardControls/KeyboardControls';

// Favourites components
import Favourites from '../../components/Favourites/Favourites';

// Auth Component
import Auth from '../../components/Auth/Auth';

// Sounds
import Sounds from '../../components/Audio/Audio';

// Spinner
import Spinner from '../../components/UI/Spinner/Spinner';

// Wrapper
import Wrapper from '../../hoc/Wrapper/Wrapper';

// Shared utilities
import { compareObjects } from '../../shared/utilities';

import * as actions from '../../store/actions/index';

import styles from '../../stylesheets/app.scss';

class Piano extends Component {

    // state = {
    //     playSound: false
    // }

    showModal = false;
    modalMessage = 'Default message';
    saveSettingsMessage = "Save your settings";
    disableSaveSettingsButton = false;
    savedSettings = null;

    // KEYBOARD SETTINGS //
    changeCurrentKeyHandler = (event) => {
        this.props.onChangeCurrentKey(event.target.dataset.currentkey);
    };

    changeNoOctavesHandler = (event) => {
        this.props.onChangeNoOctaves(event.target.dataset.octaves);
    }

    changeCurrentTypeHandler = (event) => {
        const updatedType = event.target.dataset.scalechord;

        this.props.onChangeCurrentType(updatedType);
    };

    changeSubTypeHandler = (event) => {
        const newType = event.target.dataset.scalechord;
        const newSubType = event.target.dataset.subtype;
        this.props.onChangeCurrentSubType(newType, newSubType);
    };


    // FAVOURITES SETTINGS //
    saveFavouriteHandler = () => {
        const currentKey = this.props.currentKey;
        const currentType = this.props.currentType;
        const currentSubType = this.props.currentSubType;
        const favourites = this.props.favourites ? this.props.favourites : [];
        this.props.onSaveFavourite(currentKey, currentType, currentSubType, favourites);
    };

    selectFavouriteHandler = (event) => { // Displays selected favourite on keyboard
        this.props.onSelectFavourite(event.target.dataset);
    };

    sortFavouritesHandler = (sortMethod) => {
        this.props.onSortFavourites(sortMethod);
    };

    deleteFavouriteHandler = (event) => {
        const id = event.target.parentNode.dataset.id;
        this.props.onDeleteFavourite(id);
    };


    // USER ACCOUNT SETTINGS //
    saveUserSettingsHandler = () => {
        const userSettings = {
            appSettings: {
                currentDisplay: {
                    currentKey: this.props.currentKey,
                    currentType: this.props.currentType,
                    currentSubType: this.props.currentSubType,
                    noOctaves: this.props.octaves
                },
                favouritesInfo: {
                    favourites: this.props.favourites ? this.props.favourites : [],
                    orderBy: this.props.favouritesOrderBy
                }
            }
        };

        const localId = sessionStorage.getItem('localId');

        this.props.onSaveUserSettings(userSettings, localId);

        if (!this.props.isLoggedIn) {
            this.props.onShowPopup(<Auth />, false);
        };
    };

    loginClickedHandler = () => {
        if (!this.props.isLoggedIn) {
            this.props.onAuthSwitchMode('signin');
            this.props.onShowPopup(<Auth />);
        } else {
            // Logout
            this.props.onLogout();
        }
    };


    // NAVIGATION //
    handleNavigationItemClicked = (event) => {
        const type = event.target.dataset.type;

        switch (type) {
            case "Log in":
                this.loginClickedHandler();
                break;
            case "Save settings":
                this.saveUserSettingsHandler();
                break;
            case "Save favourite":
                this.saveFavouriteHandler();
                break;
            case "Display favourites by key":
                this.sortFavouritesHandler("Key");
                break;
            case "Display favourites by type":
                this.sortFavouritesHandler("Type");
                break;
        }

    };


    // COMPONENT //
    componentWillMount() {
        const localId = sessionStorage.getItem('localId');
        // Fetch settings before rendering component
        this.props.onFetchUserSettings(localId);
    };

    componentWillUpdate(nextProps, nextState) {
        const nextAppSettings = {
            currentDisplay: {
                currentKey: nextProps.currentKey,
                currentType: nextProps.currentType,
                currentSubType: nextProps.currentSubType,
            },
            favouritesInfo: {
                favourites: nextProps.favourites,
                orderBy: nextProps.favouritesOrderBy
            }
        };

        //  Check if there are user settings waiting to be saved
        if (this.props.settingsToSave) {
            if (!this.props.isLoggedIn) {
            } else {
                const localId = sessionStorage.getItem('localId');
                this.props.onSaveUserSettings(this.props.settingsToSave, localId);
            };
        };

        this.saveSettingsMessage = this.savedSettings === nextAppSettings ? "Settings already saved" : "Save your settings";

        if (nextProps.settingsSaved) { // If settings have been saved
            // If nextAppSettings are the same as those that have already been saved
            this.savedSettings = nextProps.savedSettings;
        };

        // If user has just logged in (Or if app is started and user is already logged in)
        if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
            // Load user settings
            const localId = sessionStorage.getItem('localId');
            // Fetch settings before rendering component
            this.props.onFetchUserSettings(localId);
            // Check if there are settings waiting to be saved
            if (nextProps.settingsToSave) {
            };
        };

        // If user has just logged out
        if (this.props.isLoggedIn && !nextProps.isLoggedIn) {
            this.props.onFetchUserSettings(null, null);
        }
    };

    // RENDER //
    render() {
        let display = null;

        if (this.props.settingsFetched) {
            display = (
                <Wrapper>
                    <Keyboard
                        currentType={this.props.currentType}
                        currentSubType={this.props.currentSubType}
                        octaves={this.props.octaves}
                        favourites={this.props.favourites}
                        currentKey={this.props.currentKey}
                        navigationItemClicked={this.handleNavigationItemClicked}
                        isLoggedIn={this.props.isLoggedIn}
                    />

                    {/* Controls LH Column */}
                    <div className={styles.controlsLhColumn}>
                        <KeyboardControls
                            octaves={this.props.octaves}
                            currentType={this.props.currentType}
                            currentSubType={this.props.currentSubType}
                            currentKey={this.props.currentKey}
                            onCurrentKeyChanged={this.changeCurrentKeyHandler}
                            onscalechordChanged={this.changeCurrentTypeHandler}
                            onSubTypeChanged={this.changeSubTypeHandler}
                            onNoOctavesChanged={this.changeNoOctavesHandler} />
                    </div>

                    {/* Controls RH Column */}
                    <div className={styles.controlsRhColumn}>
                        <Favourites
                            currentType={this.props.currentType}
                            currentSubType={this.props.currentSubType}
                            currentKey={this.props.currentKey}
                            favourites={this.props.favourites}
                            selectFavourite={this.selectFavouriteHandler}
                            orderBy={this.props.favouritesOrderBy}
                            onDelete={this.deleteFavouriteHandler} />
                    </div>
                </Wrapper>
            );
        } else {
            display = <Spinner />
        }

        return (
            <Wrapper>
                {display}
            </Wrapper>
        );
    };

};

const mapStateToProps = state => {
    return {
        // Notes
        currentKey: state.notes.currentKey,
        currentType: state.notes.currentType,
        currentSubType: state.notes.currentSubType,
        octaves: state.notes.octaves,
        // Settings
        isFetchingSettings: state.settings.isFetchingSettings,
        settingsFetched: state.settings.settingsFetched,
        settingsToSave: state.settings.settingsToSave,
        isSavingSettings: state.settings.isSavingSettings,
        settingsSaved: state.settings.settingsSaved,
        savedSettings: state.settings.savedSettings,
        // Favourites
        favourites: state.favourites.favourites,
        favouritesOrderBy: state.favourites.favouritesOrderBy,
        // User Account
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Notes
        onChangeCurrentKey: (updatedCurrentKey) => dispatch(actions.changeCurrentKey(updatedCurrentKey)),
        onChangeCurrentType: (updatedType) => dispatch(actions.changeCurrentType(updatedType)),
        onChangeCurrentSubType: (updatedType, updatedSubType) => dispatch(actions.changeCurrentSubType(updatedType, updatedSubType)),
        onChangeNoOctaves: (noOctaves) => dispatch(actions.changeNoOctaves(noOctaves)),
        // Settings
        onFetchUserSettings: (localId) => dispatch(actions.fetchUserSettings(localId)),
        onSaveUserSettingsStart: (userSettings) => dispatch(actions.saveUserSettingsStart(userSettings)),
        onSaveUserSettings: (userSettings, localId) => dispatch(actions.saveUserSettings(userSettings, localId)),
        // Favourites
        onSaveFavourite: (currentKey, currentType, currentSubType, favourites) => dispatch(actions.saveFavourite(currentKey, currentType, currentSubType, favourites)),
        onSortFavourites: (sortMethod) => dispatch(actions.sortFavourites(sortMethod)),
        onDeleteFavourite: (id) => dispatch(actions.deleteFavourite(id)),
        onSelectFavourite: (favouriteInfo) => dispatch(actions.selectFavourite(favouriteInfo)),
        // Popup
        onShowPopup: (content, hideDelay) => dispatch(actions.showPopup(content, hideDelay)),
        onHidePopup: () => dispatch(actions.hidePopup()),
        // Login / Logout
        onLogout: () => dispatch(actions.logoutStart()),
        onAuthSwitchMode: (mode) => dispatch(actions.switchAuthMode(mode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Piano);