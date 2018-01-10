import React from 'react';
import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
    render() {
        return (
            <div className="row signUpPage">
                <div className="col-md-6 offset-md-3">
                    <SignUpForm/>
                </div>
            </div>
        )
    }
}

export default SignUpPage;