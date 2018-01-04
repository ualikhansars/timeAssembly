import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {displaySlots} from '../../../actions/displayAction';
import {
    updateTask
} from '../../../actions/taskAction';
import {
    getTasksStartsAfterStartTime,
    getDueTime
 } from '../../../utils/taskCalc';
 import {
    calcPossibleHoursAndMins,
    getDurationInMins,
    getFinishTimeBasedOnDuration
} from '../../../utils/timeCalc';

class UpdateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.title = this.props.taskInfo.task.title;
        this.category = this.props.taskInfo.task.category;
        this.description = this.props.taskInfo.task.description;
        this.duration = this.props.taskInfo.task.duration;
        this.startTimeHours = this.props.taskInfo.task.startTimeHours;
        this.startTimeMinutes = this.props.taskInfo.task.startTimeMinutes;
        this.finishTimeHours = this.props.taskInfo.task.finishTimeHours;
        this.finishTimeMinutes = this.props.taskInfo.task.finishTimeMinutes;
        this.day = this.props.taskInfo.task.day;
        this.userId = this.props.taskInfo.task.userId;
        this.slot = this.props.taskInfo.task.slot;
        this.id = this.props.taskInfo.task._id;
        this.durationHours = Math.floor(this.props.taskInfo.task.duration / 60); 
        this.durationMins = this.props.taskInfo.task.duration % 60;        
        this.state = {
            title: this.title,
            category: this.category,
            description: this.description,
            duration: this.duration,
            durationHours: this.durationHours,
            durationMins: this.durationMins,
            startTimeHours: this.startTimeHours,
            startTimeMinutes: this.startTimeMinutes,
            finishTimeHours: this.finishTimeHours,
            finishTimeMinutes: this.finishTimeMinutes,
            day: this.day,
            userId: this.userId,
            slot: this.slot,
            _id: this.id       
        }
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeDurationHours(event) {
        let startHour = this.state.startTimeHours;
        let startMin = this.state.startTimeMinutes;
        let durationHours = Number(event.target.value);
        let durationMins = Number(this.state.durationMins);
        let updatedDuration = (durationHours * 60) + durationMins;
        let {finishHour, finishMin} = getFinishTimeBasedOnDuration(startHour, startMin, updatedDuration);
        this.setState({
            durationHours: event.target.value,
            duration: updatedDuration,
            finishTimeHours: finishHour,
            finishTimeMinutes: finishMin
        });
    }

    onChangeDurationMinutes(event) {
        let startHour = this.state.startTimeHours;
        let startMin = this.state.startTimeMinutes;
        let durationHours = Number(this.state.durationHours);
        let durationMins = Number(event.target.value);
        let updatedDuration = (durationHours * 60) + durationMins;
        let {finishHour, finishMin} = getFinishTimeBasedOnDuration(startHour, startMin, updatedDuration);
        this.setState({
            durationMins: event.target.value,
            duration: updatedDuration,
            finishTimeHours: finishHour,
            finishTimeMinutes: finishMin
        });
        //console.error('this.state:', this.state);
    }


    onSubmit(e) {
        e.preventDefault();
        let updatedTask = Object.assign({}, this.state);
        this.props.updateTask(updatedTask);
    }
    render() {
        let {tasks} = this.props.taskInfo;
        let startTimeHours = this.state.startTimeHours;
        let startTimeMinutes = this.state.startTimeMinutes;
        let tasksStartsAfterStartTime = getTasksStartsAfterStartTime(startTimeHours, startTimeMinutes, tasks);
        // get min tasks that starts after start time
        // to calculate possible duration
        let {dueHours, dueMins} = getDueTime(tasksStartsAfterStartTime);
        let possibleDurationInMins = getDurationInMins(startTimeHours, startTimeMinutes, dueHours, dueMins);
        //console.error('durationHours', this.state.durationHours, 'durationMins', this.state.durationMins);
        let {possibleHours, possibleMins} = calcPossibleHoursAndMins(possibleDurationInMins, this.state.durationHours, this.state.durationMins);
        let isTemporary = this.props.taskInfo.task.temporary;
        console.error('temporary', isTemporary);
        let hours = [];
        let minutes = [];
        for(let hour = 0; hour <= possibleHours; ++hour) {
            let stringHour = 'hours';
            if(hour == 1) stringHour = 'hour';
            hours.push(
                <option value={hour} key={hour}>{hour} {stringHour}</option> 
            ); 
        }
        for(let min = 0; min <= possibleMins; min += 15) {
            minutes.push(
                <option value={min} key={min}>{min} minutes</option> 
            );
        }
        return (
             <div className="tasks-form">
                     <h2>Update Task: {this.state.title}</h2>
                     <div>
                        <h4>Category: {this.state.category}</h4>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-md-12">Description</label>
                        <input value={this.state.description} onChange={this.onChangeDescription.bind(this)} type="text" className="form-control col-md-12" id="description" name="description" placeholder="What exactly to do" />
                    </div>
                    <div className="form-group row">
                    <label htmlFor="duration" className="col-md-12 duration">Duration:</label>
                    <div className="col-md-5">
                        <span className="hours">Hours:</span>
                        <select value={this.state.durationHours} onChange={this.onChangeDurationHours.bind(this)} id="durationHours" name="durationHours">
                            {hours}
                        </select>
                    </div>
                    
                    <div className="col-md-5 offset-md-1">
                        <span className="minutes">Minutes:</span>
                        <select value={this.state.durationMins} onChange={this.onChangeDurationMinutes.bind(this)} id="durationMins" name="durationMins">
                            {minutes}
                        </select>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Update</button>
                        </div>
                        <div className="col-md-4">
                            <button onClick={() => this.props.displaySlots()} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
             </div>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            displaySlots,
            updateTask
        }, 
        dispatch
    );
}

UpdateTaskForm.propTypes = {
    displaySlots: PropTypes.func.isRequired,
    taskInfo: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);