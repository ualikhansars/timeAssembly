import React from 'react';
import axios from 'axios';

class EmailConfirmationPage extends React.Component {
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div className="container send">
                <div className="row">
                    <div className="col-md-12">
                        <h4>Thanks for creating account timeAssembly</h4>
                        <h4>Please, check your email, we've sent you a verification link</h4>
                        <h4>Didn't receive a link, 
                            <button className="btn btn-success">
                                Resend
                            </button>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailConfirmationPage;