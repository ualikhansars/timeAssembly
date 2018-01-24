import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import LoginPage from './components/LoginPage';

 class LoginApp extends React.Component {
    render() {
        return (
            <LoginPage/>
        )
    }
}


ReactDOM.render((
     <BrowserRouter>
       <LoginApp/>
     </BrowserRouter>
), document.getElementById("login"))
