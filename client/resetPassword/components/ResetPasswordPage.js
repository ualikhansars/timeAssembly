import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordPage extends React.Component {
    render() {
        return (
            <div className="row signUpPage">
                <div className="col-md-6 offset-md-3">
                    <ResetPasswordForm/>
                </div>
            </div>
        )
    }
}

export default ResetPasswordPage;