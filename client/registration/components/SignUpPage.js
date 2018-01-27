import React from 'react';
import SignUpForm from './SignUpForm';
import EmailConfirmationPage from './EmailConfirmationPage';
 
class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: localStorage.getItem('formSubmitted'),
            userId: localStorage.getItem('userId'),
            userEmail: localStorage.getItem('userEmail'),
            setFormSubmittedToTrue: this.setFormSubmittedToTrue.bind(this),
            setFormSubmittedToFalse: this.setFormSubmittedToFalse.bind(this),
            setUser: this.setUser.bind(this)
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('formSubmitted');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
    }

    setFormSubmittedToTrue(){
        this.setState({
            formSubmitted: true
        });
        localStorage.setItem('formSubmitted', true);
    }

    setFormSubmittedToFalse(){
        this.setState({
            formSubmitted: false
        });
        localStorage.setItem('formSubmitted', false);
    }

    setUser(id, email) {
        this.setState({
            userId: id,
            userEmail: email
        });
        localStorage.setItem('userId', id);
        localStorage.setItem('userEmail', email);
    }


    render() {
        let formSubmitted = this.state.formSubmitted;
        if(formSubmitted == 'true' || formSubmitted == true) {
            return (
                <EmailConfirmationPage setFormSubmittedToTrue={this.state.setFormSubmittedToTrue} setFormSubmittedToFalse={this.state.setFormSubmittedToFalse} setUser={this.state.setUser}/>
            );
        } else {
            return (
                <div className="row signUpPage">
                    <div className="col-md-6 offset-md-3">
                        <SignUpForm setFormSubmittedToTrue={this.state.setFormSubmittedToTrue} setFormSubmittedToFalse={this.state.setFormSubmittedToFalse} setUser={this.state.setUser}/>
                    </div>
                </div>
            );
        }
        
    }
}

export default SignUpPage;