import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faStop);

const audioControl = (props) => {
    let audioControlItem;

    switch (props.type) {
        case "playStop":
            audioControlItem = (
                props.play ?
                    <FontAwesomeIcon icon={faPlay} onClick={props.clicked} data-controltype={props.controlType} /> :
                    <FontAwesomeIcon icon={faStop}  onClick={props.clicked} data-controltype={props.controlType}/>
            );
            break;
        default:
            break;
    }
    return (
        <li >
            {audioControlItem}
        </li>
    );
};

export default audioControl;