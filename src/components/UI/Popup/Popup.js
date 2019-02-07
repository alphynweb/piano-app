import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from '../../../stylesheets/app.scss';

class Popup extends Component {

    closeButtonClickHandler = () => {
        this.props.onHidePopup();
    };

    componentDidUpdate(nextProps, nextState) {
        if (this.props.show && this.props.hideDelay) {
            const t = setTimeout(() => {
                this.props.onHidePopup()
            }, 2000);
        }
    };

    render() {
        const popupShowStyle = styles.popup;
        const popupHideStyle = [styles.popup, styles.hide].join(' ');
        const popupStyle = this.props.show ? popupShowStyle : popupHideStyle;

        return (
            <div className={popupStyle}>
                <span className={styles.closeButton} onClick={this.closeButtonClickHandler}>X</span>
                {this.props.content}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        show: state.popup.show,
        content: state.popup.content,
        hideDelay: state.popup.hideDelay
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHidePopup: () => dispatch(actions.hidePopup())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);