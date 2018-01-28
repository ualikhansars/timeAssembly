import React from 'react';
import axios from 'axios';
import classnames from 'classnames';

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirmation: '',
            errors: []
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            errors: []
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: []
        });
        axios.post('/resetPassword', this.state)
        .then(res => {
            let updatedErrors = Object.assign([], this.state.errors);
            if(res.data.confirmation === 'validation error') {
                updatedErrors = res.data.errors;
                this.setState({
                    errors: updatedErrors
                });
            }
        
            else if(res.data.confirmation === 'success') {
                window.location.href = "/passwordChanged";
            }
        });
    }

    render() {
        let errors = this.state.errors;
        let passwordErrors = null;
        let passwordConfirmationErrors = null;
        let passwordErrorMsg, passwordConfirmationErrorMsg;
        errors.map(val => {
            if(val.param === 'password') passwordErrors = val;
            if(val.param === 'passwordConfirmation') passwordConfirmationErrors = val;
        });

        if(passwordErrors) passwordErrorMsg = passwordErrors.msg;
        if(passwordConfirmationErrors) passwordConfirmationErrorMsg = passwordConfirmationErrors.msg;
    
       
        return (
            <div className="container">
                <div className="row titleContainer">
                    <div className="col-md-12 ">
                        <span className="title">
                            Reset Password TimeAssembly
                        </span>
                    </div>
                </div>
                <form onSubmit={this.onSubmit.bind(this)} className="signUpForm">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className={classnames("form-group", {"has-danger": passwordErrorMsg})}>
                                <label className="form-control-label newPassword">New Password</label>
                                <input 
                                    value={this.state.password}
                                    onChange={this.onChange.bind(this)}
                                    type="password"
                                    name="password"
                                    className={classnames("form-control", {"form-control-danger": passwordErrorMsg})}
                                />
                                {passwordErrorMsg && <span className="form-control-feedback">{passwordErrorMsg}</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className={classnames("form-group", {"has-danger": passwordConfirmationErrorMsg})}>
                                <label className="form-control-label">Repeat New Password</label>
                                <input 
                                    value={this.state.passwordConfirmation}
                                    onChange={this.onChange.bind(this)}
                                    type="password"
                                    name="passwordConfirmation"
                                    className={classnames("form-control", {"form-control-danger": passwordConfirmationErrorMsg})}
                                />
                                {passwordConfirmationErrorMsg && <span className="form-control-feedback">{passwordConfirmationErrorMsg}</span>}
                            </div>
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg btn-block">
                                   Reset password
                                </button>
                            </div>
                        </div>
                    </div> 
                </form> 
            </div>
            
        )
        
    }
}

export default ResetPasswordForm;