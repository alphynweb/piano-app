import React from 'react';

import styles from '../../stylesheets/app.scss';

const PianoKey = (props) => {

    let whiteKeyStyles;
    let blackKeyStyles;
    let blackKeyStylesFirst;
    let blackKeyStylesLast;
    const isPlaying = props.isPlaying ? styles.isPlaying : null;

    switch (props.noOctaves) {
        case 1:
            whiteKeyStyles = [styles.pianokey, styles.oneoctave, styles.white].join(' ');
            blackKeyStyles = [styles.pianokey, styles.oneoctave, styles.black].join(' ');
            blackKeyStylesFirst = [styles.pianokey, styles.oneoctave, styles.black, styles.firstingroup].join(' ');
            blackKeyStylesLast = [styles.pianokey, styles.oneoctave, styles.black, styles.lastingroup].join(' ');
            break;
        case 2:
            whiteKeyStyles = [styles.pianokey, styles.twooctave, styles.white].join(' ');
            blackKeyStyles = [styles.pianokey, styles.twooctave, styles.black].join(' ');
            blackKeyStylesFirst = [styles.pianokey, styles.twooctave, styles.black, styles.firstingroup].join(' ');
            blackKeyStylesLast = [styles.pianokey, styles.twooctave, styles.black, styles.lastingroup].join(' ');
            break;
        case 3:
            whiteKeyStyles = [styles.pianokey, styles.threeoctave, styles.white].join(' ');
            blackKeyStyles = [styles.pianokey, styles.threeoctave, styles.black].join(' ');
            blackKeyStylesFirst = [styles.pianokey, styles.threeoctave, styles.black, styles.firstingroup].join(' ');
            blackKeyStylesLast = [styles.pianokey, styles.threeoctave, styles.black, styles.lastingroup].join(' ');
            break;
        default:

            break;
    };

    const baseKeyClass = props.isBlack ? (props.firstInGroup ? blackKeyStylesFirst : (props.lastInGroup ? blackKeyStylesLast : blackKeyStyles)) : whiteKeyStyles;


    let keyClass = props.isActive ? (props.isPlaying ? [baseKeyClass, styles.active, styles.isPlaying].join(' ') : [baseKeyClass, styles.active].join(' ')) : baseKeyClass;

    return (
        props.isBlack ?
            <div className={keyClass}>
                {/* Top of key */}
                <div>
                </div>
                {/* Triangle at bottom of key */}
                <span>

                </span>
            </div> :
            <div className={keyClass}>
            </div>
    );
};

export default PianoKey;