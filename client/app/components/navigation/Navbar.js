import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/userAction';

class Navbar extends React.Component {
    
    logout(e) {
        e.preventDefault();
        this.props.logout();
        window.location.href = '/signin';
    }

    render() {
        const {isAuthenticated} = this.props.userInfo;
        const userLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.logout.bind(this)}>Logout</a>
                </li> 
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/signup" className="nav-link" >Registration</a>
                </li> 
                <li className="nav-item">
                    <a href="/signin" className="nav-link" >Login</a>
                </li> 
            </ul>
        );

        return(
            <nav className="navbar navbar-toggleable-md navbar-light">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a href="#" className="logo">TimeAssembly</a>
                <div className="collapse navbar-collapse" id="navbarNav">
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

Navbar.propTypes = {
    userInfo: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
