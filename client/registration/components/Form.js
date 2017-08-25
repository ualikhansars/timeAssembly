import React from 'react';

class Form extends React.Component {
    render() {
        return(
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
        )
    }
}

export default Form;