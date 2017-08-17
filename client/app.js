import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import Home from './components/layout/Home';



ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('app')
);
