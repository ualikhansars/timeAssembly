import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './styles';


import {onClickTime} from '../../actions/daysAction';
import {getTimeDependsOnTimeFormat} from '../../utils/timeCalc';

class TimeInterval extends React.Component {

    render() {
        let {hour, min} = this.props;
        let {timeFormat} = this.props.preferences;
        let twelveHoursFormat = false;
        let displayTimeClassName = 'time';
        let addTaskClassName = 'addTask';
        if(timeFormat === 12) {
            displayTimeClassName += ' col-md-3';
            addTaskClassName += ' col-md-9';
        } else {
            displayTimeClassName += ' col-md-2';
            addTaskClassName += ' col-md-10';
        }
        let {startTimeHours, startTimeMinutes} = this.props.taskInfo;
        let displayTime = getTimeDependsOnTimeFormat(hour, min, timeFormat);
        let time, addTask;
        if(startTimeHours == hour && startTimeMinutes == min) {
            time = styles.timeInterval.time;
            addTask = styles.timeInterval.addTask;
        }
        
        return (
            <div className="container">
                <div onClick={() => this.props.onClickTime(hour, min)} className="row timeInterval">
                    <div className={displayTimeClassName} style={time}>
                            {displayTime}
                    </div>
                    <div className={addTaskClassName} style={addTask}>
                        <div className="taskInput">
                     
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            onClickTime,
        }, 
        dispatch
    );
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences,
        taskInfo: state.taskInfo
    };
}

TimeInterval.propTypes = {
    hour: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    meridien: PropTypes.string,
    onClickTime: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInterval);

