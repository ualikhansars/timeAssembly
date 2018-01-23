import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectTask} from '../../actions/taskAction';

import {
    convertDurationToHours,
    getTimeDependsOnTimeFormat
} from '../../utils/timeCalc';

class Task extends React.Component {
    render() {
        //console.error('property', this.props.property);
        let {
            title,
            category,
            description,
            duration,
            startTimeHours,
            startTimeMinutes,
            finishTimeHours,
            finishTimeMinutes,
            day,
            slot,
            id
        } = this.props.property;
        let showDescription;
        let task = this.props.task;
        if(description) {
            showDescription = <div className="row">
                                <div className="col-md-12">
                                    <span>Description: {description}</span>
                                </div>
                            </div>
        }
        
        if(startTimeHours < 10) {
            startTimeHours = '0' + startTimeHours;
        }
        if(finishTimeHours < 10) {
            finishTimeHours = '0' + finishTimeHours;
        }
        let {meridien, timeFormat} = this.props.preferences;
        let taskContentClassName = 'taskContent';
        let taskTimeClassName = 'taskTime';
        if(timeFormat === 12) {
            taskContentClassName += ' col-md-9';
            taskTimeClassName += ' col-md-3 ';
        } else {
            taskContentClassName += ' col-md-10';
            taskTimeClassName += ' col-md-2';
        }
        let startTime = getTimeDependsOnTimeFormat(startTimeHours, startTimeMinutes, timeFormat, meridien);
        let finishTime = getTimeDependsOnTimeFormat(finishTimeHours, finishTimeMinutes, timeFormat, meridien);
        let durationInHours = convertDurationToHours(duration);
        
        return (
            <div className="task container">
                <div className="row">
                    <div className={taskTimeClassName}>
                        <div className="taskStartTime">
                            {startTime}
                        </div>
                        <div className="taskFinishTime">
                            {finishTime}
                        </div>
                    </div>
                    <div className={taskContentClassName}>
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <span className="taskTitle">{title}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <span>Category: {category}</span>
                                </div>
                            </div>
                        {showDescription}
                        <div className="row">
                            <div className="col-md-12">
                                <span>Duration: {durationInHours}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <img src="/img/edit.png" onClick={() => this.props.onClickUpdate(id)} className="editTask"/>
                                <img src="/img/list.png" onClick={() => this.props.selectTask(id)} className="listTask" />
                                <img src="/img/trushBin.png" onClick={() => this.props.removeTask(task)} className="removeTask" />        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            selectTask
        }, 
        dispatch
    );
}

Task.propTypes = {
    selectTask: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);