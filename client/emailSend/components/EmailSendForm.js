import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import jwt from 'jsonwebtoken';
import {PropTypes} from 'prop-types';


class EmailSendForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            formError: '',
            errors: []
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: []
        });
        let email = this.state.email;
        console.log('email', email);
        axios.post('/emailSend', {email: email})
        .then(res => {
            console.error('response', res);
            let updatedErrors = Object.assign([], this.state.errors);
            if(res.data.confirmation === 'validation error') {
                updatedErrors = res.data.errors;
                this.setState({
                    errors: updatedErrors
                });
            }
            
            else if(res.data.confirmation === 'success') {
                window.location.href = "/checkEmail";
            }
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log('state', this.state);
    }


    render() {
        let errors = this.state.errors;
        let emailErrors = null;
        let emailErrorMsg;
        let formError = this.state.formError;

        errors.map(val => {
            if(val.param === 'email') emailErrors = val;
        });

        if(emailErrors) emailErrorMsg = emailErrors.msg;
        return(
            <div className="container">
                <div className="row titleContainer">
                    <div className="col-md-12 ">
                        <span className="title">
                           Enter your email address and we will
                           send you a link to reset your password 
                        </span>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-12">
                            {formError && <div className="alert alert-danger">{formError}</div>}
                        </div>
                    </div>
                <form onSubmit={this.onSubmit.bind(this)} className="loginForm">
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
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg btn-block">
                                    send password reset email
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            
        );
    }
}

export default EmailSendForm;