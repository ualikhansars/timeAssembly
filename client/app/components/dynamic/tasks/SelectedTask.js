import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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
        return (
            <div className="container selectedTask">
                <div className="row">
                    <div className="col-md-12">
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
                        <p>Description: {description}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>StartTime: {startTimeHours}:{startTimeMinutes}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Finish Time: {finishTimeHours}:{finishTimeMinutes}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Duration: {duration} minutes</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTask: state.taskInfo.currentlySelectedTask
    };
}

export default connect(mapStateToProps, null)(SelectedTask);