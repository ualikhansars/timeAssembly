import React from 'react';
import {render} from 'react-dom';

class LoginApp extends React.Component {
    render() {
        return (
            <h1>Login App</h1>
        )
    }
}

render(<LoginApp/>, document.getElementById("login"));