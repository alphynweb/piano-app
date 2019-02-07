import React from 'react';

import Control from '../../UI/Controls/Control/Control';

import { compareObjects } from '../../../shared/utilities';

import styles from '../../../stylesheets/app.scss';

const favouritescontrols = (props) => {
    const favouriteToSave = {
        currentKey: props.currentKey,
        currentSubType: props.currentType === 'Scale' ? props.currentSubType.Scale : props.currentSubType.Chord,
        currentType: props.currentType
    };
    const isFavourite = props.favourites.find(favourite => compareObjects(favourite, favouriteToSave));
    return (
        <div className={styles.favouritesControls}>
            <h2>Favourites</h2>
            <Control
                buttonType="saveFavourite"
                label={isFavourite ? "Saved to favourites" : "Save current selection as favourite"}
                isDisabled={isFavourite ? 'disabled' : null}
                clicked={props.saveFavourite} />

            <Control
                buttonType="sortFavourites"
                sort="Key"
                label="Key"
                addButtonClass={props.orderBy === 'Key' ? 'active' : null}
                clicked={props.sortFavourites} />

            <Control
                buttonType="sortFavourites"
                sort="Type"
                label="Type"
                addButtonClass={props.orderBy === 'Type' ? 'active' : null}
                clicked={props.sortFavourites} />
        </div>
    );
};

export default favouritescontrols;