import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {
    BrowserRouter, 
    Route, 
    Switch
} from 'react-router-dom';

import Home from './components/layout/Home';
import SignUpPage from '../registration/components/SignUpPage';
import LoginPage from '../login/components/LoginPage'; 

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup"  component={SignUpPage} />
                <Route path="/signin"  component={LoginPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
  ), document.getElementById("app"))