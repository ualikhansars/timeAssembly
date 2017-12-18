import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getScheduleTime} from '../../../utils/timeCalc';


// import actions
import {
    changeStartDisplayHour,
    changeFinishDisplayHour
} from '../../../actions/preferencesAction';

class ScheduleTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startHour: this.props.preferences.startDisplayHour,
            finishHour: this.props.preferences.finishDisplayHour
        }
    }

    // change preferences startTime
    onChangeStartTime(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
        // convert finishTime to Number
        let startTime = Number(event.target.value);
        this.props.changeStartDisplayHour(startTime, this.props.userInfo.user.id);
    }

    // change preferences finishTime
    onChangeFinishTime(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
        // convert finishTime to Number
        let finishTime = Number(event.target.value);
        this.props.changeFinishDisplayHour(finishTime, this.props.userInfo.user.id);
    }

    render() {
        let {startDisplayHour, finishDisplayHour} = this.props.preferences;

        // display startHour select from 0 to finishHour
        let startHour = getScheduleTime(0, finishDisplayHour).map((hour, i) => {
            let stringHour = String(hour + ':00');
            if(hour <= 9) '0' + stringHour;
            return <option value={hour} key={i}>{stringHour}</option> 
        });

        // display finishHour select from startHour to 24
        let finishHour = getScheduleTime(startDisplayHour).map((hour, i) => {
            let stringHour = String(hour + ':00');
            if(hour <= 9) '0' + stringHour;
            return <option value={hour} key={i}>{stringHour}</option> 
        });
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 preferencesItemTitle">
                        <h5>Schedule Time</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span className="preferencesName">Start Hour:</span>
                        <select value={this.state.startHour} 
                            id="startHour" 
                            onChange={this.onChangeStartTime.bind(this)}
                            name="startHour">
                            {startHour}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <span className="preferencesName">Finish Hour:</span>
                        <select value={this.state.finishHour} 
                            id="finishHour" 
                            onChange={this.onChangeFinishTime.bind(this)}
                            name="finishHour">
                            {finishHour}
                        </select> 
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
            changeStartDisplayHour,
            changeFinishDisplayHour
        }, 
        dispatch
    );
}

ScheduleTime.propTypes = {
    preferences: PropTypes.object.isRequired,
    changeStartDisplayHour: PropTypes.func.isRequired,
    changeFinishDisplayHour: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTime);