import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import {compareObjects} from '../../../shared/utilities';

import styles from '../../../stylesheets/app.scss';

const navigationItems = (props) => {
    const favouriteToSave = {
        currentKey: props.currentKey,
        currentSubType: props.currentType === 'Scale' ? props.currentSubType.Scale : props.currentSubType.Chord,
        currentType: props.currentType
    };
    const isFavourite = props.favourites.find(favourite => compareObjects(favourite, favouriteToSave));

    return (
        <ul className={styles.navigationItems}>
            <NavigationItem clicked={props.itemClicked} type="user" isLoggedIn={props.isLoggedIn} />
            <NavigationItem clicked={props.itemClicked} type="favourites" isFavourite={isFavourite} />
        </ul>
    );
};

export default navigationItems;