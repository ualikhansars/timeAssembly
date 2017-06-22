import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Home} from './components/layout/Home';

import {Provider} from 'react-redux';
import store from './store';

class App extends React.Component {
    render() {
        return(
            <Home/>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);