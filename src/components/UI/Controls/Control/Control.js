import React from 'react';

import styles from '../../../../stylesheets/app.scss';

// Props = buttonType, buttonClass, label, clicked, currentKey, scalechord
const control = (props) => {

    let controlButton;
    const baseButtonClass = props.isHeaderButton ? [styles.button, styles.fullWidth].join(' ') : styles.button;
    const addButtonClass = props.addButtonClass === 'active' ? styles.active : props.addButtonClass === 'activepassive' ? styles.activepassive : null;
    const buttonClass = [baseButtonClass, addButtonClass].join(' ');
    const isDisabled = props.isDisabled;

    switch (props.buttonType) {
        // C, C#, D etc - sends back currentKey change when clicked with data-currentkey
        case "currentKey":
            controlButton = <button className={buttonClass} data-currentkey={props.label} onClick={props.clicked}>{props.label}</button>;
            break;
        case "octave":
            controlButton = <button className={buttonClass} data-octaves={props.octaves} onClick={props.clicked}>{props.label}</button>
            // Switch between scale and chord section (makes section active) - sends back scale/arp active section change with data-scalechord
            break;
        case "scalechord":
            controlButton = <button className={buttonClass} data-scalechord={props.scalechord} onClick={props.clicked}>{props.label} {props.section}</button>;
            break;
        // Changes minor, major, etc - also switches scale and chord section - sends back scale/arp active section change with data-scalechord
        // Also sends back minor/major etc change in the active section with data-subtype
        case "subType":
            controlButton = <button className={buttonClass} data-scalechord={props.scalechord} data-subtype={props.subType} onClick={props.clicked}>{props.label}</button>;
            break;
        case "saveFavourite":
            controlButton = <button className={buttonClass} onClick={props.clicked} disabled={isDisabled}>{props.label}</button>
            break;
        case "sortFavourites":
            controlButton = <button className={buttonClass} data-sortmethod={props.sort} onClick={props.clicked}>{props.label}</button>
            break;
        case "saveSettings":
            controlButton = <button className={buttonClass} onClick={props.clicked} disabled={isDisabled}>{props.label}</button>
            break;
        case "login":
            controlButton = <button className={buttonClass} onClick={props.clicked}>{props.label}</button>
            break;
        default:
            break;
    }

    return (
        <span>
            {controlButton}
        </span>
    );
};

export default control;