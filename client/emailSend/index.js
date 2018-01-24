import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

import EmailSendPage from './components/EmailSendPage';

 class EmailSendApp extends React.Component {
    render() {
        return (
            <EmailSendPage/>
        )
    }
}

render(<EmailSendApp/>, document.getElementById("emailSend"));