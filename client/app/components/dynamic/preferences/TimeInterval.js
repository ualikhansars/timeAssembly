import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import actions
import {
    showEveryHour,
    showEvery15Minutes,
    showEvery30Minutes
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
                    <div className="col-md-6 offset-md-2">
                        <h5>Time Interval</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span>Every Hour</span>
                    </div>
                    <div className="col-md-6">
                        <span onClick={() => this.props.showEveryHour()}>{everyHour}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span>Every 15 Minutes</span>
                    </div>
                    <div className="col-md-6">
                         <span onClick={() => this.props.showEvery15Minutes()}>{every15Minutes}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span>Every 30 minutes</span>
                    </div>
                    <div className="col-md-6">
                         <span onClick={() => this.props.showEvery30Minutes()}>{every30Minutes}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            showEveryHour,
            showEvery15Minutes,
            showEvery30Minutes
        }, 
        dispatch
    );
}

TimeInterval.propTypes = {
    preferences: PropTypes.object.isRequired,
    showEvery15Minutes: PropTypes.func.isRequired,
    showEvery30Minutes: PropTypes.func.isRequired,
    showEveryHour: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInterval);