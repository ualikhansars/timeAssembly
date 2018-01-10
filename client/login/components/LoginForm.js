import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import jwt from 'jsonwebtoken';
import {PropTypes} from 'prop-types';
import setAuthToken from '../../utils/setAuthToken';
import {setCookie} from '../../utils/setCookie';
import {logDev} from '../../../utils/logDev';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formError: '',
            errors: []
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let userData = Object.assign({}, this.state);
        axios.post('/users/login', userData)
        .then(res => {
            logDev.default('res', res);
            let updatedErrors = Object.assign([], this.state.errors);
            if(res.data.confirmation === 'validation error') {
                updatedErrors = res.data.errors;
                this.setState({
                    errors: updatedErrors
                });
            }
            if(res.data.confirmation === 'failed' && res.data.message==='Invalid email address or password') {
                this.setState({
                    formError: res.data.message
                });
            }
            if(res.data.confirmation === 'success') {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                window.location = "http://localhost:3000";
                setCookie(token);
            }
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        logDev.default('state', this.state);
    }

    render() {
        let errors = this.state.errors;
        let emailErrors = null;
        let passwordErrors = null;
        let emailErrorMsg, passwordErrorMsg;
        let formError = this.state.formError;

        errors.map(val => {
            if(val.param === 'email') emailErrors = val;
            if(val.param === 'password') passwordErrors = val;
        });

        if(emailErrors) emailErrorMsg = emailErrors.msg;
        if(passwordErrors) passwordErrorMsg = passwordErrors.msg;
        return(
            
            <div className="container">
                <div className="row titleContainer">
                    <div className="col-md-12 ">
                        <span className="title">
                            Sign In to TimeAssembly
                        </span>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-12">
                            {formError && <div className="alert alert-danger">{formError}</div>}
                        </div>
                    </div>
                <form onSubmit={this.onSubmit.bind(this)} className="loginForm" >
                    
                    
                    
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className={classnames("form-group", {"has-danger": emailErrorMsg})}>
                                <label className="form-control-label emailLabel">Email</label>
                                <input 
                                    type="text"
                                    name="email"
                                    className={classnames("form-control", {"form-control-danger": emailErrorMsg})}
                                    onChange={this.onChange.bind(this)}
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
                                    type="password"
                                    name="password"
                                    className={classnames("form-control", {"form-control-danger": passwordErrorMsg})}
                                    onChange={this.onChange.bind(this)}
                                />
                                {passwordErrorMsg && <span className="form-control-feedback">{passwordErrorMsg}</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg btn-block">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row redirect">
                    <div className="col-md-10 offset-md-1">
                        <h6>
                            <a href="/signup">
                                Don't have an account, Register
                            </a>
                        </h6>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LoginForm;