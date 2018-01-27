import React from 'react';
import axios from 'axios';

class EmailConfirmationPage extends React.Component {

    onResend() {
        let userId = localStorage.getItem('userId');
        let userEmail = localStorage.getItem('userEmail');
        let data = {
            userId,
            userEmail
        }
        console.error('data', data);
        axios.post('/sendEmailVerificationToken', data);
    }

    goBackToSignUpForm() {
        this.props.setFormSubmittedToFalse();
        this.props.setUser(null, null);
    }

    render() {
        return (
            <div className="container send">
                <div className="row">
                    <div className="col-md-12">
                        <h4>Thanks for creating account timeAssembly</h4>
                        <h4>Please, check your email, we've sent you a verification link</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <span>Didn't receive a link:</span>
                        <button onClick={() => this.onResend()} className="btn btn-default">
                            Resend
                        </button>
                    </div>
                </div>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={() => this.goBackToSignUpForm()} className="btn btn-default">
                            Go to Sign Up Page
                        </button>
                        <small>You won't be able to resend a verification link</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailConfirmationPage;