import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/userAction';
import {withRouter, Link} from 'react-router-dom';

class NavbarWithoutRouter extends React.Component {
    
    logout(e) {
        e.preventDefault();
        this.props.logout();
        //window.location.href = 'http://localhost:3000/signin';
        this.props.history.push('/signin');
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
                    <Link to="/signup" className="nav-link" >Registration</Link>
                </li> 
                <li className="nav-item">
                    <Link to="/signin" className="nav-link" >Login</Link>
                </li> 
            </ul>
        );

        return(
            <nav className="navbar navbar-toggleable-md navbar-light">
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

const Navbar = withRouter(NavbarWithoutRouter);

Navbar.propTypes = {
    userInfo: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);