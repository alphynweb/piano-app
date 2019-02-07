import React, { Component } from 'react';

import { connect } from 'react-redux';

import Backdrop from '../Backdrop/Backdrop';

import Spinner from '../../UI/Spinner/Spinner';

import * as styles from '../../../stylesheets/app.scss';

import * as actions from '../../../store/actions/index';

// State needed and componentWillUpdate to make disappear and change message in real time etc etc

class Modal extends Component {
    backdropClickHandler = () => {
        this.props.onHideModal();
    };

    closeButtonClickHandler = () => {
        this.props.onHideModal();
    };

    render() {
        const modalStyle = this.props.show ? styles.modal : styles.hide;
        return (
            <Backdrop show={this.props.show}>
                <div className={modalStyle}>
                    <span className={styles.closeButton} onClick={this.closeButtonClickHandler}>Close</span>
                    {this.props.content}
                </div>
            </Backdrop>
        );
    }
};

const mapStateToProps = state => {
    return {
        show: state.modal.show,
        content: state.modal.content
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHideModal: () => dispatch(actions.hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);