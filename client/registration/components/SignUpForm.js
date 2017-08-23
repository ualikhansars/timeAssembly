import React from 'react';
import axios from 'axios';
import classnames from 'classnames';

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
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: []
        });
        let userData = Object.assign({}, this.state);
        axios.post('/api/user', userData)
        .then(res => {
            console.log('res', res);
            if(res.data.confirmation === 'validation error') {
                this.setState({
                    errors: res.data.errors
                });
            }
            console.log('state', this.state);
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
    
        console.log('emailErrors', emailErrors);
        console.log('passwordErrors', passwordErrors);
        console.log('passwordConfirmationErrors', passwordConfirmationErrors);
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>Registration</h1>
                <div className={classnames("form-group", {"has-danger": emailErrorMsg})}>
                    <label className="form-control-label">Email</label>
                    <input 
                        value={this.state.email}
                        onChange={this.onChange.bind(this)}
                        type="text"
                        name="email"
                        className={classnames("form-control", {"form-control-danger": passwordConfirmationErrorMsg})}
                    />
                    {emailErrorMsg && <span className="form-control-feedback">{emailErrorMsg}</span>}
                </div>

                <div className={classnames("form-group", {"has-danger": passwordErrorMsg})}>
                    <label className="form-control-label">Password</label>
                    <input 
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                        type="password"
                        name="password"
                        className={classnames("form-control", {"form-control-danger": passwordConfirmationErrorMsg})}
                    />
                    {passwordErrorMsg && <span className="form-control-feedback">{passwordErrorMsg}</span>}
                </div>

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
                <div className="form-group">
                   <button className="btn btn-primary btn-lg">
                        Sign Up
                   </button>
                </div>
            </form>
        );
    }
}

export default SignUpForm;