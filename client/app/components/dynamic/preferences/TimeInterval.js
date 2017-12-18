import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import actions
import {
    changeTimeInterval
} from '../../../actions/preferencesAction';

class TimeInterval extends React.Component {
    render() {
        // change display On and Off
        // after choosing preference
        let everyHour;
        let every15Minutes;
        let every30Minutes;
        if(this.props.preferences.timeInterval == 60) {
            everyHour = 'On';
            every15Minutes = 'Off';
            every30Minutes = 'Off';
        } 
        if(this.props.preferences.timeInterval == 30) {
            everyHour = 'Off';
            every15Minutes = 'Off';
            every30Minutes = 'On';
        }
        if(this.props.preferences.timeInterval == 15) {
            everyHour = 'Off';
            every15Minutes = 'On';
            every30Minutes = 'Off';
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 preferencesItemTitle">
                        <h5>Time Interval</h5>
                    </div>
                </div>
                <div className="row preferencesAttribute">
                    <div className="col-md-8">
                        <span className="preferencesName">Every Hour</span>
                    </div>
                    <div className="col-md-4 preferencesValue">
                        <span onClick={() => this.props.changeTimeInterval(60, this.props.userInfo.user.id)}>{everyHour}</span>
                    </div>
                </div>
                <div className="row preferencesAttribute">
                    <div className="col-md-8 preferencesName">
                        <span>Every 15 Minutes</span>
                    </div>
                    <div className="col-md-4 preferencesValue">
                         <span onClick={() => this.props.changeTimeInterval(15, this.props.userInfo.user.id)}>{every15Minutes}</span>
                    </div>
                </div>
                <div className="row preferencesAttribute">
                    <div className="col-md-8 preferencesName">
                        <span>Every 30 Minutes</span>
                    </div>
                    <div className="col-md-4 preferencesValue">
                         <span onClick={() => this.props.changeTimeInterval(30, this.props.userInfo.user.id)}>{every30Minutes}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences,
        userInfo: state.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            changeTimeInterval
        }, 
        dispatch
    );
}

TimeInterval.propTypes = {
    preferences: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    changeTimeInterval: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInterval);