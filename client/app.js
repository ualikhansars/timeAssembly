import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import App from './components/layout/App';
import Home from './components/layout/Home';
import SignUpPage from './components/registration/SignUpPage';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/signup" component={SignUpPage}/>
        </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);