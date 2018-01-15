import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
    calcFinishTime, 
    calcMins, 
    get12HoursFrom24Hours,
    getTimeDependsOnTimeFormat,
    getDurationInMins,
    calcPossibleHoursAndMins
} from '../../../utils/timeCalc';
import {
   getTasksStartsAfterStartTime,
   getDueTime
} from '../../../utils/taskCalc';
import {twentyFourHours, mins} from '../../../utils/vars';
import {logDev} from '../../../../../utils/logDev';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.errors = ''
        this.title = this.props.slotInfo.slot.title;
        this.category = this.props.slotInfo.slot.category;
        this.slot = this.props.slotInfo.slot._id;  
        this.temporary = this.props.slotInfo.slot.temporary; 
        this.day =  this.props.daysInfo.chosenDay;
        this.startTimeHours = this.props.taskInfo.startTimeHours;
        this.startTimeMinutes = this.props.taskInfo.startTimeMinutes;     
        this.userId = this.props.slotInfo.slot.userId;
        this.description = '';   
        this.state = {
            task: {
                title: this.title,
                category: this.category,
                temporary: this.temporary,
                description: this.description,
                duration: 30,
                startTimeHours: this.startTimeHours,
                startTimeMinutes: this.startTimeMinutes,
                finishTimeHours: 0,
                finishTimeMinutes: 0,
                day: this.day,
                userId: this.userId,
                slot: this.slot
            },
            durationHours: 0,
            durationMins: 0,        
            possibleDurationInMins: 0
        }
    }

    componentDidMount() {
        this.calcInitialPossibleDuration();
    }

    onChange(event) {
        this.setState({
                [event.target.id]: event.target.value
        },
        function() {
            this.onCheckValidation();
        }
        );  
        logDev.red('state:', this.state);
    }


    onCheckValidation() {
        let createButton = document.getElementById('createBtn');
        if(!this.isFinishHourValidated() && this.isDurationValidated()) {
            this.setState({
                errors: 'Due time for task cannot be more than 24 hours'
            });
            createButton.disabled = true;
        }
        else if(!this.isDescriptionValidated() && this.isDurationValidated()) {
            this.setState({
                errors: 'description cannot be more than 180 characters'
            });
            createButton.disabled = true;
        }
        else if(!this.isDurationValidated()) {
            this.setState({
                errors: 'Please, assign duration time for your task'
            });
            createButton.disabled = true;
        }
        else if(this.isDurationValidated() && this.isDurationValidated() && this.isDescriptionValidated()) {
            this.setState({
                errors: ''
            });
            createButton.disabled = false;
        }
    }

    isDurationValidated() {
        let durationHours = Number(this.state.durationHours);
        let durationMins = Number(this.state.durationMins);
        if(durationHours === 0 && durationMins === 0) {
           return false;
        } else {
            return true;
        }
    }

    isDescriptionValidated() {
        let description = this.state.description;
        if(description) {
            if(description.length > 180) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    isFinishHourValidated() {
        let duration = Number(this.state.task.duration);
        let startTimeHours = Number(this.state.task.startTimeHours);
        let startTimeMinutes = Number(this.state.task.startTimeMinutes);
        let {finishHour, finishMin} = calcFinishTime(startTimeHours, startTimeMinutes, duration);
        if(finishHour > 24) {
            return false;
        } else {
            return true;
        }
    }

    calcInitialPossibleDuration() {
        let {startTimeHours, startTimeMinutes, tasks} = this.props.taskInfo;
        let tasksStartsAfterStartTime = getTasksStartsAfterStartTime(startTimeHours, startTimeMinutes, tasks);
        let {dueHours, dueMins} = getDueTime(tasksStartsAfterStartTime);
        let possibleDurationInMins = getDurationInMins(startTimeHours, startTimeMinutes, dueHours, dueMins);
        let durationHours = 1;
        if(possibleDurationInMins < 60) durationHours = 0; 
        this.setState({
            durationHours: durationHours,
            possibleDurationInMins: possibleDurationInMins
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // process duration
        let duration = Number(this.state.task.duration);
        let durationHours = Number(this.state.durationHours);
        let durationMins = this.state.durationMins; // do not convert to number
        // calculate duration mins
        if(this.state.durationMins == '00') {
            durationMins = 0;
        } else {
            durationMins = Number(this.state.durationMins);
        }
        duration = calcMins(durationHours, durationMins);
        logDev.red('CreateTaskForm');
        logDev.default('duration', duration);
        // process startTime
        let startTimeHours = Number(this.state.task.startTimeHours);
        let startTimeMinutes = this.state.task.startTimeMinutes; // do not convert to number
      
        if(this.state.task.startTimeMinutes == '00') {
            startTimeMinutes = 0;
        } else {
            startTimeMinutes = Number(this.state.task.startTimeMinutes);
        }
        let {finishHour, finishMin} = calcFinishTime(startTimeHours, startTimeMinutes, duration);
        logDev.red('finishHour:', finishHour + ':' + finishMin);
        // if hour is less than 24, then save task
        if(this.isFinishHourValidated()) {
            if(!this.isDurationValidated()) {
                this.setState({
                    errors: 'Please, assign duration time for your task'
                });
            } else {
                console.log('description', this.state.description);
                let updatedTask = Object.assign({}, this.state.task, {
                    finishTimeHours: finishHour,
                    finishTimeMinutes: finishMin,
                    duration: duration,
                    description: this.state.description
                });
                this.props.createTask(updatedTask);
            }
        } else {
            this.setState({
                errors: 'Due time for task cannot be more than 24 hours'
            });
        }
    }

    
    render() {
        let {startTimeHours, startTimeMinutes, tasks} = this.props.taskInfo;
        logDev.default('tasks', tasks);
        let {meridien, timeFormat} = this.props.preferences;
        // to display time in proper format
        let displayTime = getTimeDependsOnTimeFormat(startTimeHours, startTimeMinutes, timeFormat, meridien);

        // get min tasks that starts after start time
        // to calculate possible duration
        let possibleDurationInMins = this.state.possibleDurationInMins;
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
             <div className="container slots-form createTask">
                <div className="row">
                    <div className="col-md-12 titleContainer">
                        <h2 className="title">{this.state.task.title}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 categoryContainer">
                        <h4 className="category">Category: {this.state.task.category}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 addToContainer">
                        <h6 className="addTo">Add to {this.day} at {displayTime}</h6>
                    </div>
                </div>
                    
                <div className="form-group row">
                    <label htmlFor="description" className="col-md-12 description">Description:</label>
                    <input onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="description" name="description" placeholder="What exactly to do" />
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
                <div className="row errors">
                    <div className="col-md-12">
                        {this.state.errors}
                    </div>
                </div>
                <div className="row buttonContainer">
                    <div className="col-md-4 createButton">
                        <button onClick={this.onSubmit.bind(this)} className="btn btn-success" id="createBtn">Create</button>
                    </div>
                    <div className="col-md-4 offset-md-4 cancelButton">
                        <button onClick={() => this.props.hideTaskForm()} className="btn btn-danger">Cancel</button>
                    </div>
                </div>
             </div>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        slotInfo: state.slotInfo,
        daysInfo: state.daysInfo,
        taskInfo: state.taskInfo,
        preferences: state.preferences
    };
}

CreateTaskForm.propTypes = {
    slotInfo: PropTypes.object.isRequired,
    daysInfo: PropTypes.object.isRequired,
    taskInfo: PropTypes.object.isRequired,
    preferences: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(CreateTaskForm);


