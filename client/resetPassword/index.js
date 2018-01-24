import React from 'react';
import {render} from 'react-dom';

import ResetPasswordPage from './components/ResetPasswordPage';

class ResetPasswordApp extends React.Component {
    render() {
        return (
            <div className="container">
                 <ResetPasswordPage/>
            </div>
         ) 
    }
}

render(<ResetPasswordApp/>, document.getElementById("resetPassword"));