import React from 'react';
import axios from 'axios';
import classnames from 'classnames';

import {logDev} from '../../../utils/logDev';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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

    checkEmailExist(e) {
        const field = e.target.name;
        const val = e.target.value;
        if(val !== '') {
            axios.get(`/users/getUserEmail/${val}`).
            then(result => {
                if(result.data.confirmation === 'success') {
                    if(result.data.user !== null) {
                        let updatedErrors = this.state.errors;
                        updatedErrors.push(
                            {param: 'email', msg: 'There is a user with such email address'}
                        )
                        this.setState({
                            errors: updatedErrors
                        });
                    } 
                }
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: []
        });
        let userData = Object.assign({}, this.state);
        axios.post('/api/user', userData)
        .then(res => {
            let updatedErrors = Object.assign([], this.state.errors);
            if(res.data.confirmation === 'validation error') {
                updatedErrors = res.data.errors;
                this.setState({
                    errors: updatedErrors
                });
            }
            // model validation
            if(res.data.confirmation === 'failed' && res.data.message.name === 'ValidationError') {
                updatedErrors.push(
                    {param: 'email', msg: 'There is a user with such email address'}
                )
                this.setState({
                    errors: updatedErrors
                });
            }
            if(res.data.confirmation === 'success') {
                axios.get('/send');
            }
            logDev.default('state', this.state);
        });
    }

    render() {
        let errors = this.state.errors;
        let emailErrors = null;
        let passwordErrors = null;
        let passwordConfirmationErrors = null;
        let emailErrorMsg, passwordErrorMsg, passwordConfirmationErrorMsg;
        errors.map(val => {
            if(val.param === 'email') emailErrors = val;
            if(val.param === 'password') passwordErrors = val;
            if(val.param === 'passwordConfirmation') passwordConfirmationErrors = val;
        });

        if(emailErrors) emailErrorMsg = emailErrors.msg;
        if(passwordErrors) passwordErrorMsg = passwordErrors.msg;
        if(passwordConfirmationErrors) passwordConfirmationErrorMsg = passwordConfirmationErrors.msg;
    
       
        return (
            <div className="container">
                <div className="row titleContainer">
                    <div className="col-md-12 ">
                        <span className="title">
                            Create an account TimeAssembly
                        </span>
                    </div>
                </div>
                <form onSubmit={this.onSubmit.bind(this)} className="signUpForm">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className={classnames("form-group", {"has-danger": emailErrorMsg})}>
                                <label className="form-control-label emailLabel">Email</label>
                                <input 
                                    value={this.state.email}
                                    onChange={this.onChange.bind(this)}
                                    onBlur={this.checkEmailExist.bind(this)}
                                    type="text"
                                    name="email"
                                    className={classnames("form-control", {"form-control-danger": emailErrorMsg})}
                                />
                                {emailErrorMsg && <span className="form-control-feedback">{emailErrorMsg}</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className={classnames("form-group", {"has-danger": passwordErrorMsg})}>
                                <label className="form-control-label">Password</label>
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
                                <label className="form-control-label">Password confirmation</label>
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
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div> 
                </form> 
                <div className="row redirect">
                    <div className="col-md-12">
                        <h6>
                            <a href="/signin">
                                Already have an account, Signin
                            </a>
                        </h6>
                    </div>
                </div>
            </div>
            
        )
        
    }
}

export default SignUpForm;