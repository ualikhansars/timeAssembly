import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

import EmailSendPage from './components/LoginPage';

 class EmailSendApp extends React.Component {
    render() {
        return (
            <EmailSendPage/>
        )
    }
}

ReactDOM.render((
     <BrowserRouter>
       <EmailSendApp/>
     </BrowserRouter>
), document.getElementById("login"))