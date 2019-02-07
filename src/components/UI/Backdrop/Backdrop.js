import React from 'react';

import * as styles from '../../../stylesheets/app.scss';

const backdrop = (props) => (
    props.show ? <div className={styles.backdrop} onClick={props.clicked}>{props.children}</div> : null
);

export default backdrop;