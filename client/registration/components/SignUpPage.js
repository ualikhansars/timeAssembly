import React from 'react';
import SignUpForm from './SignUpForm';
import EmailConfirmationPage from './EmailConfirmationPage';
 
class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            userId: null,
            userEmail: null,
            changeFormSubmitted: this.changeFormSubmitted.bind(this),
            setUser: this.setUser.bind(this)
        }
    }

    changeFormSubmitted(){
        this.setState({
            formSubmitted: !this.state.formSubmitted
        });
    }

    setUser(id, email) {
        this.setState({
            userId: id,
            userEmail: email
        });
        console.log('setUser');
        console.log('state', this.state);
    }


    render() {
        if(this.state.formSubmitted) {
            return (
                <EmailConfirmationPage/>
            );
            
        } else {
            return (
                <div className="row signUpPage">
                    <div className="col-md-6 offset-md-3">
                        <SignUpForm changeFormSubmitted={this.state.changeFormSubmitted} setUser={this.state.setUser}/>
                    </div>
                </div>
            );
        }
        
    }
}

export default SignUpPage;