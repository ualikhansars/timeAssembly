import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';

import Dynamic from '../dynamic/Dynamic';
import Navbar from '../navigation/Navbar';
import Sidebar from '../sidebar/Sidebar'; 
import TaskContainer from '../taskContainer/TaskContainer'; 

import setAuthToken from '../../../utils/setAuthToken';
import {setCurrentUser} from '../../actions/userAction';

class Home extends React.Component {

    componentDidMount() {
        if(localStorage.jwtToken) {
            setAuthToken(localStorage.jwtToken);
            let token = localStorage.jwtToken;
            let decodeToken = jwt.decode(token);
            this.props.setCurrentUser(decodeToken);
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Navbar/>
                    </div>
                </div>
                 <div className="row">
                    <div className="col-md-4 tasks">
                        <TaskContainer/>
                    </div>
                    <div className="col-md-6 dynamic">
                        <Dynamic/>
                    </div>
                    <div className="col-md-2 settings">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setCurrentUser
        }, 
        dispatch
    );
}

Home.propTypes = {
    setCurrentUser: PropTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(Home);