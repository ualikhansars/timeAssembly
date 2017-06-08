import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Home} from './components/layout/Home';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';

const store = createStore(reducers);

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