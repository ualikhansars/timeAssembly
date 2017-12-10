import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {
    BrowserRouter, 
    Route, 
    browserHistory,
    Switch
} from 'react-router-dom';

import Home from './components/layout/Home';
import SignUpPage from '../registration/components/SignUpPage';
import LoginPage from '../login/components/LoginPage'; 

// ReactDOM.render(
//     <Provider store={store}>
//         <Home/>
//     </Provider>,
//     document.getElementById('app')
// );


ReactDOM.render((
    <BrowserRouter history={browserHistory}>
        <Switch>
            <Provider store={store}>
                <Route path="/" exact component={Home} />
            </Provider>
            <Route path="/register" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    </BrowserRouter>
  ), document.getElementById("app"))