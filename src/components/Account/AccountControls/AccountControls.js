import React from 'react';

import Control from '../../UI/Controls/Control/Control';

import styles from '../../../stylesheets/app.scss';

const accountControls = (props) => (
    <div class={styles.accountControls}>
        <h2>Account</h2>
        <Control
            buttonType="login"
            label={props.isLoggedIn ? 'Log Out' : 'Log in'}
            clicked={props.loginClicked} />
        <Control
            buttonType="saveSettings"
            label={props.saveSettingsMessage}
            clicked={props.saveSettings}
            isDisabled={props.disableSaveSettingsButton} />
    </div>
);

export default accountControls;