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
    getDurationInMins
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

    onChange(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
        console.error('this.state', this.state);
    }

    onSubmit(e) {
        e.preventDefault();
        let duration = Number(this.state.duration);
        let finishTimeHours, finishTimeMinutes;
        let startTimeHours = Number(this.state.startTimeHours);
        let startTimeMinutes = Number(this.state.startTimeMinutes);
        let finishHours = startTimeHours;
        let finishMinutes = startTimeMinutes;
        if(duration < 0) {
            duration = 0;
        }
        if(duration < 60) {
            let addition = startTimeMinutes + duration; // 80 or 30
            if(addition === 60) {
                finishHours++;
                finishMinutes = 0;
            }
            if(addition < 60) { // 30
                finishMinutes = startTimeMinutes + duration;
            }  
            if(addition > 60) { // 80
               let balance = startTimeMinutes - duration;
               finishHours++;
               finishMinutes = balance;
            }
        } else { // duration > 60
            let parameter = Math.floor(duration / 60); // 200 / 60 === 3
            let balance = duration % 60;
            finishHours = startTimeHours + parameter;
            finishMinutes = startTimeMinutes + balance;
        }
        let updatedTask = Object.assign({}, this.state, {
            finishTimeHours: finishHours,
            finishTimeMinutes: finishMinutes,
        });
        console.log('updatedTask', updatedTask);
        this.props.updateTask(updatedTask);
    }
    render() {
        console.error('id', this.state._id);
        console.error('userId', this.state.userId);
        console.error('slot', this.state.slot);
        console.error('duration', this.state.duration);
        let {tasks} = this.props.taskInfo;
        let startTimeHours = this.state.startTimeHours;
        let startTimeMinutes = this.state.startTimeMinutes;
        console.log('startTimeHours:', startTimeHours, 'startTimeMinutes', startTimeMinutes);
        console.log('tasks:', tasks);
        let tasksStartsAfterStartTime = getTasksStartsAfterStartTime(startTimeHours, startTimeMinutes, tasks);
        console.error('taskStartsAfterStartTime', tasksStartsAfterStartTime);
        // get min tasks that starts after start time
        // to calculate possible duration
        let {dueHours, dueMins} = getDueTime(tasksStartsAfterStartTime);
        let possibleDurationInMins = getDurationInMins(startTimeHours, startTimeMinutes, dueHours, dueMins);
        console.error('durationHours', this.state.durationHours, 'durationMins', this.state.durationMins);
        let {possibleHours, possibleMins} = calcPossibleHoursAndMins(possibleDurationInMins, this.state.durationHours, this.state.durationMins);
        
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
                        <input value={this.state.description} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="description" name="description" placeholder="What exactly to do" />
                    </div>
                    <div className="form-group row">
                    <label htmlFor="duration" className="col-md-12 duration">Duration:</label>
                    <div className="col-md-5">
                        <span className="hours">Hours:</span>
                        <select value={this.state.durationHours} onChange={this.onChange.bind(this)} id="durationHours" name="durationHours">
                            {hours}
                        </select>
                    </div>
                    
                    <div className="col-md-5 offset-md-1">
                        <span className="minutes">Minutes:</span>
                        <select value={this.state.durationMins} onChange={this.onChange.bind(this)} id="durationMins" name="durationMins">
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