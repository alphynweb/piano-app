import React, { Component } from 'react';

import { connect } from 'react-redux';

import Auth from '../../components/Auth/Auth';

import Popup from '../../components/UI/Popup/Popup';

import * as actions from '../../store/actions/index';

class Layout extends Component {

    handleLoginClicked = () => {
        this.props.onShowPopup(<Auth />);
    };

    componentWillUpdate(nextProps, nextState) {
        if (this.props.isLoggedIn) {
            this.props.onHideModal();
        };
    };

    render() {
        return (
            <div>
                <Popup />
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // Auth
        isLoggingIn: state.auth.isLoggingIn,
        isLoggedIn: state.auth.isLoggedIn,
        isLoginError: state.auth.error,
        // Modal
        showModal: state.modal.show,
        modalContent: state.modal.content,
        // Popup
        showPopup: state.popup.show,
        popupContent: state.popup.content,
        // Settings
        isSavingSettings: state.settings.isSavingSettings,
        isFetchingSettings: state.settings.isFetchingSettings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Modal
        onShowModal: (content) => dispatch(actions.showModal(content)),
        onHideModal: () => dispatch(actions.hideModal()),
        onSetModalContent: (content) => dispatch(actions.setModalContent(content)),
        // Popup
        onShowPopup: (content) => dispatch(actions.showPopup(content))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);