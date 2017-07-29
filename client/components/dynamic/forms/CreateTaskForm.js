import React from 'react';
import {connect} from 'react-redux';

import {
    calcFinishTime, 
    calcMins, 
    get12HoursFrom24Hours,
    getTimeDependsOnTimeFormat
} from '../../../utils/timeCalc';
import {twentyFourHours, mins} from '../../../utils/vars';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.errors = ''
        this.title = this.props.slotInfo.slot.title;
        this.category = this.props.slotInfo.slot.category;
        this.slot = this.props.slotInfo.slot._id;  
        this.day =  this.props.daysInfo.chosenDay;
        this.startTimeHours = this.props.taskInfo.startTimeHours;
        this.startTimeMinutes = this.props.taskInfo.startTimeMinutes;        
        this.state = {
            task: {
                title: this.title,
                category: this.category,
                description: '',
                duration: 30,
                startTimeHours: this.startTimeHours,
                startTimeMinutes: this.startTimeMinutes,
                finishTimeHours: 0,
                finishTimeMinutes: 0,
                day: this.day,
                username: '5954dadd41b4a32e8b86c405',
                slot: this.slot
            },
            durationHours: 0,
            durationMins: 0,       
        }
    }

    onChange(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
        console.log('On Change', this.state);
    }

    onSubmit(e) {
        e.preventDefault();
        // process duration
        let duration = Number(this.state.task.duration);
        let durationHours = Number(this.state.durationHours);
        let durationMins = this.state.durationMins;
        // calculate duration mins
        if(this.state.durationMins == '00') {
            durationMins = 0;
        } else {
            durationMins = Number(this.state.durationMins);
        }
        duration = calcMins(durationHours, durationMins);
        console.log('duration', duration);
        // process startTime
        let startTimeHours = Number(this.state.task.startTimeHours);
        let startTimeMinutes = this.state.task.startTimeMinutes;
      
        if(this.state.task.startTimeMinutes == '00') {
            startTimeMinutes = 0;
        } else {
            startTimeMinutes = Number(this.state.task.startTimeMinutes);
        }
        let {finishHour, finishMin} = calcFinishTime(startTimeHours, startTimeMinutes, duration);
        console.error('finishHour:', finishHour + ':' + finishMin);
        // if hour is less than 24, then save task
        if(finishHour <= 24) {
            let updatedTask = Object.assign({}, this.state.task, {
                finishTimeHours: finishHour,
                finishTimeMinutes: finishMin,
                duration: duration
            });
            this.props.createTask(updatedTask);
            console.log('task', updatedTask);
        } else {
            this.setState({
                errors: 'Due time for task cannot be more than 24 hours'
            });
        }
    }

    
    render() {
        let {startTimeHours, startTimeMinutes} = this.props.taskInfo;
        let {meridien, timeFormat} = this.props.preferences;
        let displayTime = getTimeDependsOnTimeFormat(startTimeHours, startTimeMinutes, timeFormat, meridien);
        let hours = twentyFourHours.map((hour, i) => {
            let stringHour = 'hours';
            if(hour == 1) stringHour = 'hour';
            return <option value={hour} key={i}>{hour} {stringHour}</option> 
        });
        let minutes = mins.map((min, i) => {
            return <option value={min} key={i}>{min} minutes</option> 
        });
        return (
             <div className="slots-form">
                     <h2>{this.state.title}</h2>
                     <div>
                        <h4>Category: {this.state.category}</h4>
                    </div>
                    <div>
                        <h6>Add to {this.day} </h6>
                        <span>Time: {displayTime}</span>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-md-12">Description</label>
                        <input value={this.state.description} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="description" name="description" placeholder="What exactly to do" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="duration" className="col-md-12">Duration</label>
                        {/* <input value={this.state.duration} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="duration" name="duration" placeholder="Duration of this task in minutes" /> */}
                        <span>Hours</span>
                        <select value={this.state.durationHours} onChange={this.onChange.bind(this)} id="durationHours" name="durationHours">
                            {hours}
                        </select>
                        <span>Minutes</span>
                        <select value={this.state.durationMins} onChange={this.onChange.bind(this)} id="durationMins" name="durationMins">
                            {minutes}
                        </select>
                        {this.state.errors}
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Create</button>
                        </div>
                        <div className="col-md-4">
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



export default connect(mapStateToProps, null)(CreateTaskForm);


