import React from 'react';

import styles from '../../../../stylesheets/app.scss';

const subMenuItem = (props) => {
    const elementStyle = props.disabled ? styles.disabled : null;
    return (
        <li className={elementStyle} onClick={props.clicked} data-type={props.type}>{props.label}</li>
    );
};

export default subMenuItem;