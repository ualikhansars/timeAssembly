import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
    convertDurationToHours,
    getTimeDependsOnTimeFormat
} from '../../../utils/timeCalc';

class SelectedTask extends React.Component {
    render() {
        let {
            category,
            day,
            description,
            duration,
            finishTimeHours,
            finishTimeMinutes,
            startTimeHours,
            startTimeMinutes,
            title
        } = this.props.selectedTask;
        let descriptionContent = null;
        if(description) {
            descriptionContent = <div className="row">
                                    <div className="col-md-12">
                                        <p>Description: {description}</p>
                                    </div>
                                </div>
        }
        let durationInHours = convertDurationToHours(duration);
        let {meridien, timeFormat} = this.props.preferences;
        let startTime = getTimeDependsOnTimeFormat(startTimeHours, startTimeMinutes, timeFormat, meridien);
        let finishTime = getTimeDependsOnTimeFormat(finishTimeHours, finishTimeMinutes, timeFormat, meridien);
        
        return (
            <div className="container selectedTask">
                <div className="row">
                    <div className="col-md-12 titleContainer">
                        <h1>Title: {title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Category: {category}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Day: {day}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Start Time: {startTime}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Finish Time: {finishTime}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Duration: {durationInHours}</p>
                    </div>
                </div>
                {description}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.taskInfo.currentlySelectedTask,
        preferences: state.preferences
    };
}

export default connect(mapStateToProps, null)(SelectedTask);