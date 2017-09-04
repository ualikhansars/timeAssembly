import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {logout} from '../../actions/userAction';

class Navbar extends React.Component {
    
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const {isAuthenticated} = this.props.userInfo;
        const userLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                </li> 
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/signup">Registration</a>
                </li> 
                <li className="nav-item">
                    <a href="/signin">Login</a>
                </li> 
            </ul>
        );

        return(
            <nav className="navbar navbar-tes navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a href="#" className="navbar-brand">Timetable</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Get Started<span className="sr-only">(current)</span></a>
                    </li>
                </ul>  
                {isAuthenticated ? userLinks : guestLinks}
            </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);