// Collection of keyboard controls - key, scale/arp, etc.
import React from 'react';

import Control from '../../UI/Controls/Control/Control';

import { generateKey } from '../../../shared/utilities';

import { keyboardSetup, keyboardConfig } from '../../../../src/keyboardSetup';
import { scaleChordInfo } from '../../../../src/scaleChordInfo';

import styles from '../../../stylesheets/app.scss';

// To do - build list of key buttons, scale/chord select buttons and major/minor type etc buttons
// Buttons are dynamic, for example, chord brings up sub-menu of diminished and dominant, whereas scale brings up different minor types
// Sub menu can use ScaleInfo.js to build the buttons.

const keyboardControls = (props) => {

    let addButtonClass;

    // Dynamically build menus of keyboard controls

    // Create buttons - active where name of button is the same as the currentKey
    const currentKeyButtons = keyboardSetup.map(k => {
        // Work out additional buttonClass - active if the button's key is the same as the current key
        addButtonClass = k.name === props.currentKey ? 'active' : null;
        return <Control
            key={generateKey(k.name)}
            buttonType="currentKey"
            addButtonClass={addButtonClass}
            label={k.name}
            currentKey={props.currentKey}
            clicked={props.onCurrentKeyChanged} />
    });

    // Number of octaves selector
    const octaveButtons = [];

    for (let i = 1; i < keyboardConfig.noOctaves + 1; i++) {

        addButtonClass = i === props.octaves ? 'active' : null;
        const octaveButton = <Control
            buttonType="octave"
            addButtonClass={addButtonClass}
            label={i}
            octaves={i}
            clicked={props.onNoOctavesChanged} />
        octaveButtons.push(octaveButton);
    };

    // Establish current subtype for active section (scale/arp)
    // const subType = props.currentType === 'Scale' ? props.currentSubType.Scale : props.currentSubType.Chord;
    let subType;

    // If scale/arp active section is scale then create button which is active where subtype matches from scalechord.info
    // If scale/arp active section is not scale then create button which is activepassive where subtype matched from scalechord.info
    const scaleSubTypeButtons = scaleChordInfo.filter(info => info.type === 'Scale').map(info => {
        subType = props.currentSubType.Scale;
        addButtonClass = props.currentType === 'Scale' && info.subType === subType ? 'active' : props.currentType !== 'Scale' && info.subType === subType ? 'activepassive' : null;
        return <Control
            key={generateKey(info.subType.concat('Scale'))}
            buttonType="subType"
            addButtonClass={addButtonClass}
            label={info.subType}
            scalechord="Scale"
            currentType={props.type}
            currentSubType={subType}
            subType={info.subType}
            clicked={props.onSubTypeChanged} />
    });

    // If scale/arp active section is chord then create button which is active where subtype matches from scalechord.info
    // If scale/arp active section is not chord then create button which is activepassive where subtype matched from scalechord.info
    const arpSubTypeButtons = scaleChordInfo.filter(info => info.type === 'Chord').map(info => {
        subType = props.currentSubType.Chord;
        addButtonClass = props.currentType === 'Chord' && info.subType === subType ? 'active' : props.currentType !== 'Chord' && info.subType === subType ? 'activepassive' : null;
        return <Control
            key={generateKey(info.subType.concat('Arp'))}
            buttonType="subType"
            addButtonClass={addButtonClass}
            label={info.subType}
            scalechord="Chord"
            currentType={props.type}
            currentSubType={subType}
            subType={info.subType}
            clicked={props.onSubTypeChanged} />
    });

    const scaleButtonAddStyle = props.currentType === 'Scale' ? 'active' : null;
    const arpButtonAddStyle = props.currentType === 'Chord' ? 'active' : null;

    return (
        < div className={styles.keyboardControls}>
            <div className={styles.controlSection}>
                <h2>Key</h2>
                {currentKeyButtons}
            </div>
            <div className={styles.controlSection}>
                <h2>Type</h2>
                <div className={styles.scaleChordSection}>
                    {/* Create button which is active if scale/arp is scale and not active if it isn't */}
                    <Control
                        buttonType="scalechord"
                        addButtonClass={scaleButtonAddStyle}
                        currentType={props.currentType}
                        label="Scale"
                        scalechord="Scale"
                        clicked={props.onscalechordChanged}
                        isHeaderButton={true} />
                    <br />
                    {scaleSubTypeButtons}
                </div>
                <div className={styles.scaleChordSection}>
                    {/* Create button which is active if scale/arp is chord and not active if it isn't */}
                    <Control
                        buttonType="scalechord"
                        addButtonClass={arpButtonAddStyle}
                        currentType={props.currentType}
                        label="Chord"
                        scalechord="Chord"
                        clicked={props.onscalechordChanged}
                        isHeaderButton={true} />
                    <br />
                    {arpSubTypeButtons}
                </div>
            </div>
        </div >
    );
};

export default keyboardControls;