import React from 'react';

import AudioControl from './AudioControl/AudioControl';

import {compareObjects} from '../../../shared/utilities';

import styles from '../../../stylesheets/app.scss';

const audioControls = (props) => {

    return (
        <ul className={styles.audioControls}>
            <AudioControl type="playStop" play={props.play} controlType={props.play ? 'play' : 'stop'} clicked={props.controlClicked} />
        </ul>
    );
};

export default audioControls;