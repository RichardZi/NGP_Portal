import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.scss';
import App from './App';
import Main from './Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();
const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Main />
    </Provider>,
);

serviceWorker.unregister();

