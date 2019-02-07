import React from 'react';
import ReactDOM from 'react-dom';
import styles from './stylesheets/app.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import settingsReducer from './store/reducers/settings';
import notesReducer from './store/reducers/notes';
import favouritesReducer from './store/reducers/favourites';
import authReducer from './store/reducers/auth';
import modalReducer from './store/reducers/modal';
import popupReducer from './store/reducers/popup';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// Combine Reducers
const rootReducer = combineReducers({
    settings: settingsReducer,
    notes: notesReducer,
    favourites: favouritesReducer,
    auth: authReducer,
    modal: modalReducer,
    popup: popupReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
