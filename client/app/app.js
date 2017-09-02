import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from '../utils/setAuthToken';
import Home from './components/layout/Home';

setAuthToken(localStorage.jwtToken);

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('app')
);
