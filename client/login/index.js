import React from 'react';
import ReactDOM from 'react-dom'
import {render} from 'react-dom';

import LoginPage from './components/LoginPage';

 class LoginApp extends React.Component {
    render() {
        return (
            <LoginPage/>
        )
    }
}


render(<LoginApp/>, document.getElementById("login"));
