import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from '../../../stylesheets/app.scss';


class UserDetails extends Component {
    render() {
        return (
            <div className={styles.userDetails}>
                <p>{this.props.userDetails ? "Logged in as " + this.props.userDetails.displayName : null}</p>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userDetails
    };
};

export default connect(mapStateToProps)(UserDetails);