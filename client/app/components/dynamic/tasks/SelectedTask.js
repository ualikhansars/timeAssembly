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
        let descriptionContent = null;
        if(description) {
            descriptionContent = <div className="row">
                                    <div className="col-md-12">
                                        <p>Description: {description}</p>
                                    </div>
                                </div>
        }
        let startMin, finishMin;
        if(startTimeMinutes == 0) {
            startMin = '00';
        }
        if(finishTimeMinutes == 0) {
            finishMin = '00';
        }
        
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
                        <p>Start Time: {startTimeHours}:{startMin}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Finish Time: {finishTimeHours}:{finishMin}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Duration: {duration} minutes</p>
                    </div>
                </div>
                {description}
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