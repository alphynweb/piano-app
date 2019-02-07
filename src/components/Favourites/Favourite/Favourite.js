import React from 'react';

import styles from '../../../stylesheets/app.scss';

const favourite = (props) => (
    <li data-id={props.currentKey.concat(" ", props.currentType, " ", props.currentSubType)}
    className={props.active ? styles.active : null}>
        <span onClick={props.clicked}
            data-currenttype={props.currentType}
            data-currentsubtype={props.currentSubType}
            data-currentkey={props.currentKey}>
            {props.currentSubType} {props.currentKey} {props.orderBy === 'Key' ? props.currentType : null}
        </span>
        <span className={styles.delete} onClick={props.delete}>X</span>
    </li >
);

export default favourite;