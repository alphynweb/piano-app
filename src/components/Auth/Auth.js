import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';

import Wrapper from '../../hoc/Wrapper/Wrapper';

import { updateObject } from '../../shared/utilities';

import * as actions from '../../store/actions/auth';

import styles from '../../stylesheets/app.scss';

class Auth extends Component {
    state = {
        formSignupInputs: {
            signUpDisplayName: {
                inputType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Your sign up username'
                },
                inputValue: '',
                label: 'Sign up username',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            signUpEmail: {
                inputType: 'input',
                inputConfig: {
                    type: 'email',
                    placeholder: 'Your sign up email'
                },
                inputValue: '',
                label: 'Sign up email',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            signUpPassword: {
                inputType: 'input',
                inputConfig: {
                    type: 'password',
                    placeholder: 'Your sign up password'
                },
                inputValue: '',
                label: 'Sign up password',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                touched: false,
                valid: false
            },
            signUpRememberMe: {
                inputType: 'input',
                inputConfig: {
                    type: 'checkbox',
                    placeholder: null
                },
                label: 'Remember Me',
                validation: {
                    isRequired: false
                },
                touched: false,
                valid: true,
                checked: false
            }
        },
        formSigninInputs: {
            signInEmail: {
                inputType: 'input',
                inputConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                inputValue: '',
                label: 'Email',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            signInPassword: {
                inputType: 'input',
                inputConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                inputValue: '',
                label: 'Password',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                touched: false,
                valid: false
            },
            signInRememberMe: {
                inputType: 'input',
                inputConfig: {
                    type: 'checkbox',
                    placeholder: null
                },
                label: 'Remember Me',
                validation: {
                    isRequired: false
                },
                touched: false,
                valid: true,
                checked: false
            }
        }
    };

    changeInputHandler = (event, inputId) => {
        const inputsToHandle = this.props.mode === 'signin' ? this.state.formSigninInputs : this.state.formSignupInputs;

        let updatedInputs;

        switch (event.target.type) {
            case "text":
            case "email":
            case "password":
                updatedInputs = updateObject(inputsToHandle,
                    {
                        [inputId]: updateObject(inputsToHandle[inputId],
                            {
                                inputValue: event.target.value,
                                touched: true
                            }
                        )
                    }
                );
                break;
            case "checkbox":
                updatedInputs = updateObject(inputsToHandle,
                    {
                        [inputId]: updateObject(inputsToHandle[inputId],
                            {
                                checked: event.target.checked,
                                touched: true
                            }
                        )
                    }
                );
                break;
        };

        if (this.props.mode === 'signin') {
            this.setState({
                formSigninInputs: updatedInputs
            });
        } else {
            this.setState({
                formSignupInputs: updatedInputs
            });
        }
    };

    switchModeHandler = (mode) => {
        this.props.onAuthSwitchMode(mode);
    };

    submitHandler = (event) => {
        event.preventDefault();

        let displayName;
        let email;
        let password;
        let rememberMe;

        switch (this.props.mode) {
            case 'signin':
                email = this.state.formSigninInputs.signInEmail.inputValue;
                password = this.state.formSigninInputs.signInPassword.inputValue;
                rememberMe = this.state.formSigninInputs.signInRememberMe.checked;

                this.props.onAuth(email, password, this.props.settingsToSave, rememberMe);
                break;
            case 'signup':
                displayName = this.state.formSignupInputs.signUpDisplayName.inputValue;
                email = this.state.formSignupInputs.signUpEmail.inputValue;
                password = this.state.formSignupInputs.signUpPassword.inputValue;
                rememberMe = this.state.formSignupInputs.signUpRememberMe.checked;

                this.props.onSignup(displayName, email, password, this.props.settingsToSave, rememberMe);
                break;
            default:
                break;
        }
    };

    render() {
        const loginButtonStyle = [styles.button, styles.login].join(' ');
        const formInputs = [];

        const inputsToRender = this.props.mode === 'signin' ? this.state.formSigninInputs : this.state.formSignupInputs;

        for (let key in inputsToRender) {
            formInputs.push({
                id: key,
                inputInfo: inputsToRender[key]
            });
        };

        let jsxBuffer = formInputs.map(formInput =>
            <Input
                key={formInput.id}
                inputType={formInput.inputInfo.inputType}
                inputConfig={formInput.inputInfo.inputConfig}
                inputValue={formInput.inputInfo.value}
                inputLabel={formInput.inputInfo.label}
                changed={(event) => this.changeInputHandler(event, formInput.id)} />
        );

        const signMessage = this.props.mode === 'signin' ?
            <p className={styles.formMessage} onClick={() => this.switchModeHandler('signup')}>Don't have an account? <span>Sign up</span></p> :
            <p className={styles.formMessage} onClick={() => this.switchModeHandler('signin')}>Already have an account? <span>Sign in</span></p>

        // Set up redirect to home page if authenticated
        const authRedirectPath = this.props.isLoggedIn ? <Redirect to={this.props.authRedirectPath} /> : null;
        const saveSettingsMessage = this.props.settingsToSave ? (
            <p className={styles.formMessage}>Please log in or create an account to save your settings</p>
        ) : null;

        const error = this.props.authError ? this.props.authError.message : null;

        return (
            <Wrapper>
                {authRedirectPath}
                {saveSettingsMessage}
                <form onSubmit={this.submitHandler}>
                    {jsxBuffer}
                    <p className={styles.formError}>{error}</p>
                    <button className={loginButtonStyle}>{this.props.mode === 'signin' ? 'Log In' : 'Sign Up'}</button>
                </form>
                {signMessage}
            </Wrapper>
        );
    }
};

const mapStateToProps = state => {
    return {
        authRedirectPath: state.auth.authRedirectPath,
        isLoggedIn: state.auth.isLoggedIn,
        authError: state.auth.error,
        mode: state.auth.mode,
        // Settings
        settingsToSave: state.settings.settingsToSave
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, settingsToSave, rememberMe) => dispatch(actions.auth(email, password, settingsToSave, rememberMe)),
        onSignup: (displayName, email, password, settingsToSave, rememberMe) => dispatch(actions.signup(displayName, email, password, settingsToSave, rememberMe)),
        onAuthSwitchMode: (mode) => dispatch(actions.switchAuthMode(mode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);  