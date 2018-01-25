import React from 'react';
import EmailSendForm from './EmailSendForm';

class EmailSendPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4 loginPage">
                   <EmailSendForm/>
                </div>
            </div>
        )
    }
}

export default EmailSendPage;